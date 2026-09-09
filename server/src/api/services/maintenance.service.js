import { query } from '../../database/pool.js'
import { toCamel } from '../../utils/transform.js'
import { HttpError } from '../../middleware/errorHandler.js'

// `interval_text` exists because INTERVAL is a MySQL keyword; the grid still
// wants the column as `interval`.
function toPlanRow(row) {
  const { intervalText, updatedAt, ...rest } = toCamel(row)
  return { ...rest, interval: intervalText }
}

const FILTERS = [
  ['status', 'status'],
  ['majorSystem', 'major_system'],
  ['department', 'department'],
]

export async function listJobs(filters = {}) {
  const clauses = []
  const params = []

  for (const [param, column] of FILTERS) {
    if (filters[param]) {
      clauses.push(`${column} = ?`)
      params.push(filters[param])
    }
  }
  if (filters.search) {
    clauses.push('(job_no LIKE ? OR job_title LIKE ? OR component LIKE ?)')
    params.push(...Array(3).fill(`%${filters.search}%`))
  }

  const rows = await query(
    `SELECT * FROM maintenance_plan_jobs
     ${clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''}
     ORDER BY job_no`,
    params,
  )
  return rows.map(toPlanRow)
}

const UPDATABLE = {
  jobTitle: 'job_title',
  basis: 'basis',
  interval: 'interval_text',
  lastDone: 'last_done',
  nextDue: 'next_due',
  status: 'status',
  critical: 'critical',
  classRelated: 'class_related',
  department: 'department',
  responsible: 'responsible',
  stockQty: 'stock_qty',
  stockStatus: 'stock_status',
  remarks: 'remarks',
}

export async function updateJob(jobNo, body = {}) {
  const supplied = Object.entries(UPDATABLE).filter(([key]) => body[key] !== undefined)
  if (!supplied.length) throw new HttpError(400, 'No updatable fields supplied.')

  const result = await query(
    `UPDATE maintenance_plan_jobs
        SET ${supplied.map(([, column]) => `${column} = ?`).join(', ')}
      WHERE job_no = ?`,
    [...supplied.map(([key]) => body[key] ?? null), jobNo],
  )
  if (!result.affectedRows) throw new HttpError(404, 'Not found.')

  const rows = await query('SELECT * FROM maintenance_plan_jobs WHERE job_no = ?', [jobNo])
  return toPlanRow(rows[0])
}
