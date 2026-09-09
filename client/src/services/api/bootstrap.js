// Fills every store's cache from MySQL once, before the app renders.
//
// The stores keep synchronous read signatures so the windows do not need to
// know the data now comes from a database — this is the one place that waits
// on the network. A store that fails to hydrate keeps whatever localStorage
// held, so a database outage degrades to the previous offline behaviour rather
// than an empty app.
import { checkHealth, isApiOnline } from '@/services/api/client.js'
import { setCurrentUser } from '@/services/api/session.js'
import { hydrateSimpleTasks } from '@/stores/simpleTasksStore.js'
import { hydrateCreatedWorkOrders } from '@/stores/createdWorkOrdersStore.js'
import { hydrateStandardJobs } from '@/stores/createdStandardJobsStore.js'
import { hydrateRelatedJobs } from '@/stores/relatedJobsStore.js'
import { hydrateRunningHours } from '@/stores/runningHoursStore.js'
import { hydrateCounterAllowed } from '@/stores/counterAllowedStore.js'
import {
  hydrateEquipmentAdditions,
  hydrateEquipmentTree,
} from '@/stores/equipmentStore.js'
import { hydrateDocuments } from '@/stores/documentsStore.js'
import { hydrateCertificates } from '@/stores/certificatesStore.js'

const STORES = [
  ['simple tasks', hydrateSimpleTasks],
  ['work orders', hydrateCreatedWorkOrders],
  ['standard jobs', hydrateStandardJobs],
  ['related jobs', hydrateRelatedJobs],
  ['running hours', hydrateRunningHours],
  ['counter settings', hydrateCounterAllowed],
  ['equipment structure', hydrateEquipmentTree],
  ['equipment additions', hydrateEquipmentAdditions],
  ['saved forms', hydrateDocuments],
  ['certificates', hydrateCertificates],
]

// Runs once per signed-in user. Re-invoking with a different user re-hydrates,
// because the equipment hierarchy they can see differs.
let started = null
let startedFor

export function bootstrap(userId = null) {
  if (started && startedFor === userId) return started
  startedFor = userId
  setCurrentUser(userId)
  started = run()
  return started
}

async function run() {
  const connected = await checkHealth()
  if (!connected) {
    console.warn('[ns5] Database unavailable — running on locally cached data.')
    return { connected: false, failed: STORES.map(([name]) => name) }
  }

  const results = await Promise.allSettled(STORES.map(([, hydrate]) => hydrate()))
  const failed = results
    .map((result, index) => (result.status === 'rejected' ? STORES[index][0] : null))
    .filter(Boolean)

  if (failed.length) {
    console.warn(`[ns5] Could not load from the database: ${failed.join(', ')}.`)
  }
  return { connected: isApiOnline(), failed }
}
