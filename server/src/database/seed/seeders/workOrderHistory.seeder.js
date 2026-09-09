import { pool, upsertMany } from '../../pool.js'
import { readJson, text } from '../sourceData.js'

export const name = 'work_order_history'

export async function seed() {
  const source = await readJson('jobCompletionHistory.json')

  // This table has a surrogate key, so it is cleared before reloading rather
  // than accumulating a duplicate copy on every seed.
  await pool.query('DELETE FROM work_order_history')

  const rows = source.map((row) => ({
    ship: text(row.ship),
    job_no: text(row.jobNo),
    job_title: text(row.jobTitle),
    major_system: text(row.majorSystem),
    component: text(row.component),
    completion_date: text(row.completionDate),
    reading_at_completion: text(row.readingAtCompletion),
    department: text(row.department),
    performed_by: text(row.performedBy),
    remarks: text(row.remarks),
  }))

  return upsertMany('work_order_history', Object.keys(rows[0]), rows)
}
