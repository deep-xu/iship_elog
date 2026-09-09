// Work Orders created from the Work Order window, stored in MySQL so other
// windows (e.g. the Standard Job form's "Work Orders" tab) can list the ones
// that belong to a given job.
import { api } from '@/services/api/client.js'
import { createStore } from '@/stores/_cache.js'

export const CREATED_WORK_ORDERS_STORAGE_KEY = 'ns5-created-work-orders'

const store = createStore(CREATED_WORK_ORDERS_STORAGE_KEY, [])

const withDefaults = (row) => ({ ...row, workflowStatus: row.workflowStatus || 'active' })

export async function hydrateCreatedWorkOrders() {
  const rows = await api.get('/work-orders')
  return store.hydrate(rows.map(withDefaults))
}

export function loadCreatedWorkOrders() {
  const rows = store.get()
  return Array.isArray(rows) ? rows.map(withDefaults) : []
}

// Each work order is written under its own number so a save only touches the
// row that changed.
export function saveCreatedWorkOrders(rows) {
  const next = (Array.isArray(rows) ? rows : []).map(withDefaults)
  const previous = loadCreatedWorkOrders()

  return store.set(next, async (value) => {
    const keep = new Set(value.map((row) => row.woNo))
    const removed = previous.filter((row) => row.woNo && !keep.has(row.woNo))

    await Promise.all([
      ...value.filter((row) => row.woNo).map((row) => api.put(`/work-orders/${encodeURIComponent(row.woNo)}`, row)),
      ...removed.map((row) => api.delete(`/work-orders/${encodeURIComponent(row.woNo)}`)),
    ])
  })
}

// Work orders linked to one Standard Job, matched on the WO/SR number that the
// Standard Job picker copies from the job (`jobNo`), or an explicit link.
export function findWorkOrdersForStandardJob(jobNo) {
  if (!jobNo) return []
  return loadCreatedWorkOrders().filter(
    (row) => row.standardJobNo === jobNo || row.jobNo === jobNo,
  )
}
