import { query, withTransaction } from '../../database/pool.js'
import { toCamel, asText, parseJson } from '../../utils/transform.js'
import { HttpError } from '../../middleware/errorHandler.js'

// Client key -> column, and the single source of truth for what a save may
// write.
const COLUMNS = {
  ship: 'ship',
  jobTitle: 'job_title',
  majorSystem: 'major_system',
  subSystem: 'sub_system',
  component: 'component',
  basis: 'basis',
  interval: 'interval_text',
  lastDone: 'last_done',
  nextDue: 'next_due',
  completionDate: 'completion_date',
  readingAtCompletion: 'reading_at_completion',
  status: 'status',
  critical: 'critical',
  classRelated: 'class_related',
  department: 'department',
  performedBy: 'performed_by',
  responsible: 'responsible',
  linkedPartNo: 'linked_part_no',
  stockQty: 'stock_qty',
  stockStatus: 'stock_status',
  remarks: 'remarks',
}

function toJobRow(row) {
  const { intervalText, origin, createdAt, updatedAt, ...rest } = toCamel(row)
  return { ...rest, interval: intervalText }
}

// User-created jobs first, then the seeded PMS rows — the ordering the
// Standard Job picker and query grid expect.
export async function listJobs() {
  const rows = await query(
    "SELECT * FROM standard_jobs ORDER BY origin = 'seed', created_at DESC, job_no",
  )
  return rows.map(toJobRow)
}

export async function getJob(jobNo) {
  const rows = await query('SELECT * FROM standard_jobs WHERE job_no = ?', [jobNo])
  if (!rows.length) throw new HttpError(404, 'Not found.')
  return toJobRow(rows[0])
}

// Save from the Standard Job window. Only the fields present in the body are
// written, so a form that posts a subset cannot blank the rest of the row. A
// row saved here is marked 'user' so a later re-seed leaves it alone.
export async function saveJob(jobNo, body = {}) {
  const supplied = Object.entries(COLUMNS).filter(([key]) => body[key] !== undefined)

  const columns = ['job_no', ...supplied.map(([, column]) => column), 'origin']
  const values = [jobNo, ...supplied.map(([key]) => asText(body[key])), 'user']
  const updates = [...supplied.map(([, column]) => column), 'origin']
    .map((column) => `${column} = VALUES(${column})`)
    .join(', ')

  await query(
    `INSERT INTO standard_jobs (${columns.join(', ')})
     VALUES (${columns.map(() => '?').join(', ')})
     ON DUPLICATE KEY UPDATE ${updates}`,
    values,
  )
  return getJob(jobNo)
}

// ------------------------------------------------------------- related jobs
export async function listRelatedJobs() {
  const rows = await query('SELECT source_key, data FROM related_jobs ORDER BY id')
  return rows.map((row) => ({ ...parseJson(row.data, {}), sourceKey: row.source_key }))
}

// Replaces every row that came from one Standard Job record, leaving rows
// entered from other records untouched.
export async function replaceRelatedJobs(sourceKey, rows = []) {
  const tagged = Array.isArray(rows) ? rows : []

  await withTransaction(async (connection) => {
    await connection.execute('DELETE FROM related_jobs WHERE source_key = ?', [sourceKey])

    for (const row of tagged) {
      await connection.execute(
        `INSERT INTO related_jobs (source_key, major_system, sub_system, component, data)
         VALUES (?, ?, ?, ?, ?)`,
        [
          sourceKey,
          asText(row.majorSystem),
          asText(row.subSystem),
          asText(row.component),
          JSON.stringify({ ...row, sourceKey }),
        ],
      )
    }
  })

  return { sourceKey, count: tagged.length }
}
