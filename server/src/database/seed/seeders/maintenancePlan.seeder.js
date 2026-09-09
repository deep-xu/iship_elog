import { upsertMany } from '../../pool.js'
import { importModule, text } from '../sourceData.js'

export const name = 'maintenance_plan_jobs'

export async function seed() {
  const { PLAN_ROWS } = await importModule('maintenancePlan.js')

  const rows = PLAN_ROWS.map((row) => ({
    job_no: row.jobNo,
    major_system: text(row.majorSystem),
    sub_system: text(row.subSystem),
    component: text(row.component),
    job_title: text(row.jobTitle),
    job_type: text(row.jobType),
    priority: text(row.priority),
    basis: text(row.basis),
    interval_text: text(row.interval),
    last_done: text(row.lastDone),
    next_due: text(row.nextDue),
    status: text(row.status),
    critical: text(row.critical),
    class_related: text(row.classRelated),
    department: text(row.department),
    responsible: text(row.responsible),
    linked_part_no: text(row.linkedPartNo),
    stock_qty: text(row.stockQty),
    stock_status: text(row.stockStatus),
    remarks: text(row.remarks),
  }))

  return upsertMany('maintenance_plan_jobs', Object.keys(rows[0]), rows)
}
