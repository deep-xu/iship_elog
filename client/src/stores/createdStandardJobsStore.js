// Standard jobs the user creates or edits from the Standard Job window. Both
// the base PMS list and the user's own rows now live in the `standard_jobs`
// table, so the query grid and the "Select Standard Job" picker read one list.
import { api } from '@/services/api/client.js'
import { createStore } from '@/stores/_cache.js'
import { STANDARD_JOB_ROWS } from '@/data/standardJobQuery.js'

export const CREATED_STANDARD_JOBS_STORAGE_KEY = 'ns5-created-standard-jobs'
const ALL_STANDARD_JOBS_KEY = 'ns5-standard-jobs'

const createdStore = createStore(CREATED_STANDARD_JOBS_STORAGE_KEY, [])
// The merged list straight from the server, which already orders user rows
// ahead of the seeded PMS rows.
const allStore = createStore(ALL_STANDARD_JOBS_KEY, null)

export async function hydrateStandardJobs() {
  const rows = await api.get('/standard-jobs')
  allStore.hydrate(rows)
  // Keep the "created" view in sync for callers that only want the user's own.
  const seeded = new Set(STANDARD_JOB_ROWS.map((row) => row.jobNo))
  const base = new Map(STANDARD_JOB_ROWS.map((row) => [row.jobNo, row]))
  createdStore.hydrate(
    rows.filter((row) => !seeded.has(row.jobNo) || differsFromBase(row, base.get(row.jobNo))),
  )
  return rows
}

// A seeded job that the user edited comes back with different field values;
// that is what makes it "created" from the window's point of view.
function differsFromBase(row, base) {
  if (!base) return true
  return Object.keys(base).some((key) => String(row[key] ?? '') !== String(base[key] ?? ''))
}

export function loadCreatedStandardJobs() {
  const rows = createdStore.get()
  return Array.isArray(rows) ? rows : []
}

// Insert or replace one job (matched on jobNo) and persist it.
export function saveCreatedStandardJob(row) {
  if (!row || !row.jobNo) return loadCreatedStandardJobs()

  const next = [row, ...loadCreatedStandardJobs().filter((item) => item.jobNo !== row.jobNo)]
  createdStore.set(next, () => api.put(`/standard-jobs/${encodeURIComponent(row.jobNo)}`, row))

  // Mirror the change into the merged list so the grid updates without a refetch.
  const all = allStore.get()
  if (Array.isArray(all)) {
    allStore.hydrate([row, ...all.filter((item) => item.jobNo !== row.jobNo)])
  }
  return next
}

// The full list: every standard job, user rows first. Falls back to layering
// the bundled PMS rows locally if the server list has not arrived yet.
export function getAllStandardJobs() {
  const all = allStore.get()
  if (Array.isArray(all) && all.length) return all

  const created = loadCreatedStandardJobs()
  const createdByNo = new Map(created.map((row) => [row.jobNo, row]))
  const base = STANDARD_JOB_ROWS.map((row) => createdByNo.get(row.jobNo) ?? row)
  const brandNew = created.filter((row) => !STANDARD_JOB_ROWS.some((b) => b.jobNo === row.jobNo))
  return [...brandNew, ...base]
}
