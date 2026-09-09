import { pool, upsertMany } from '../../pool.js'
import { readJson, text } from '../sourceData.js'

export const name = 'standard_jobs'

export async function seed() {
  const source = await readJson('standardJobRows.json')

  const rows = source.map((row) => ({
    job_no: row.jobNo,
    ship: text(row.ship),
    job_title: text(row.jobTitle),
    major_system: text(row.majorSystem),
    sub_system: text(row.subSystem),
    component: text(row.component),
    basis: text(row.basis),
    interval_text: text(row.interval),
    last_done: text(row.lastDone),
    next_due: text(row.nextDue),
    completion_date: text(row.completionDate),
    reading_at_completion: text(row.readingAtCompletion),
    status: text(row.status),
    critical: text(row.critical),
    class_related: text(row.classRelated),
    department: text(row.department),
    performed_by: text(row.performedBy),
    responsible: text(row.responsible),
    linked_part_no: text(row.linkedPartNo),
    stock_qty: text(row.stockQty),
    stock_status: text(row.stockStatus),
    remarks: text(row.remarks),
    origin: 'seed',
  }))

  // A job the user has edited must not be reverted by a re-seed.
  const [existing] = await pool.query("SELECT job_no FROM standard_jobs WHERE origin = 'user'")
  const userOwned = new Set(existing.map((row) => row.job_no))
  const fresh = rows.filter((row) => !userOwned.has(row.job_no))

  return fresh.length ? upsertMany('standard_jobs', Object.keys(fresh[0]), fresh) : 0
}
