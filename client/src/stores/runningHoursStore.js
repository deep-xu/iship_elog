// Committed Running Hours values, stored in MySQL so counter updates outlive
// the window component and are shared across sessions.
import { api } from '@/services/api/client.js'
import { createStore } from '@/stores/_cache.js'

const STORAGE_KEY = 'ns5-running-hours-store'
const EMPTY_STATE = { edits: {}, history: {} }

const store = createStore(STORAGE_KEY, EMPTY_STATE)

const normalize = (state) => ({
  edits: state?.edits && typeof state.edits === 'object' ? state.edits : {},
  history: state?.history && typeof state.history === 'object' ? state.history : {},
})

export async function hydrateRunningHours() {
  return store.hydrate(normalize(await api.get('/running-hours')))
}

export function loadRunningHoursState() {
  return normalize(store.get())
}

export function saveRunningHoursState(state) {
  return store.set(normalize(state), (value) => api.put('/running-hours', value))
}
