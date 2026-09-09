// Jobs added on a Standard Job form's "Related Jobs" tab, stored in MySQL so
// the same job also shows up on the Equipment window's "Standard Jobs" tab for
// whichever piece of equipment it was tagged with.
import { api } from '@/services/api/client.js'
import { createStore } from '@/stores/_cache.js'

const STORAGE_KEY = 'ns5-related-jobs-store'

const store = createStore(STORAGE_KEY, [])

export async function hydrateRelatedJobs() {
  return store.hydrate(await api.get('/standard-jobs/related/all'))
}

export function loadRelatedJobsStore() {
  const rows = store.get()
  return Array.isArray(rows) ? rows : []
}

// Replaces every entry that came from `sourceKey` (one Standard Job record)
// with `rows`, keeping entries added from other Standard Job records intact.
export function saveRelatedJobsForSource(sourceKey, rows) {
  const tagged = (Array.isArray(rows) ? rows : []).map((row) => ({ ...row, sourceKey }))
  const next = [...loadRelatedJobsStore().filter((row) => row.sourceKey !== sourceKey), ...tagged]

  return store.set(next, () =>
    api.put(`/standard-jobs/related/${encodeURIComponent(sourceKey)}`, { rows: tagged }),
  )
}

// Jobs tagged with equipment matching this node — a Major System row matches
// jobs tagged with that major system, a Sub-System row matches jobs tagged
// with that sub-system, everything else matches on component.
export function findRelatedJobsForEquipment(label, category) {
  return loadRelatedJobsStore().filter((row) => {
    if (category === 'Major System') return row.majorSystem === label
    if (category === 'Sub-System') return row.subSystem === label
    return row.component === label
  })
}
