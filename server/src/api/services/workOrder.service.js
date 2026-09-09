import { query, withTransaction } from '../../database/pool.js'
import { toCamel, asText, parseJson } from '../../utils/transform.js'
import { HttpError } from '../../middleware/errorHandler.js'

// The Work Order window keeps a large, evolving form shape, so the whole
// record lives in `data` and only the fields other windows search on are
// promoted to columns.
const toWorkOrder = (row) => ({
  ...parseJson(row.data, {}),
  woNo: row.wo_no,
  standardJobNo: row.standard_job_no ?? '',
  jobNo: row.job_no ?? '',
  workflowStatus: row.workflow_status || 'active',
})

export async function listWorkOrders({ standardJobNo, workflowStatus } = {}) {
  const clauses = []
  const params = []

  if (standardJobNo) {
    // Either link field counts, matching the client's lookup by job number.
    clauses.push('(standard_job_no = ? OR job_no = ?)')
    params.push(standardJobNo, standardJobNo)
  }
  if (workflowStatus) {
    clauses.push('workflow_status = ?')
    params.push(workflowStatus)
  }

  const rows = await query(
    `SELECT * FROM work_orders ${clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''}
     ORDER BY created_at DESC, wo_no`,
    params,
  )
  return rows.map(toWorkOrder)
}

export async function saveWorkOrder(woNo, body = {}) {
  await query(
    `INSERT INTO work_orders
       (wo_no, standard_job_no, job_no, ship, job_title, workflow_status, data)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE standard_job_no = VALUES(standard_job_no),
       job_no = VALUES(job_no), ship = VALUES(ship), job_title = VALUES(job_title),
       workflow_status = VALUES(workflow_status), data = VALUES(data)`,
    [
      woNo,
      asText(body.standardJobNo),
      asText(body.jobNo),
      asText(body.ship),
      asText(body.jobTitle),
      body.workflowStatus || 'active',
      JSON.stringify({ ...body, woNo }),
    ],
  )

  const rows = await query('SELECT * FROM work_orders WHERE wo_no = ?', [woNo])
  return toWorkOrder(rows[0])
}

export async function deleteWorkOrder(woNo) {
  const result = await query('DELETE FROM work_orders WHERE wo_no = ?', [woNo])
  if (!result.affectedRows) throw new HttpError(404, 'Not found.')
}

// ---------------------------------------------- completed-job search history
export async function searchHistory({ search, jobNo } = {}) {
  const clauses = []
  const params = []

  if (search) {
    clauses.push('(job_no LIKE ? OR job_title LIKE ? OR component LIKE ? OR performed_by LIKE ?)')
    params.push(...Array(4).fill(`%${search}%`))
  }
  if (jobNo) {
    clauses.push('job_no = ?')
    params.push(jobNo)
  }

  const rows = await query(
    `SELECT * FROM work_order_history
     ${clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''}
     ORDER BY completion_date DESC, id`,
    params,
  )
  return rows.map((row) => toCamel(row, { drop: ['id'] }))
}
