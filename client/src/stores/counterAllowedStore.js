// Whether "Allow Counter" / "Not Allow" is set on an Equipment window's
// Counter tab, stored in MySQL and shared across the app so the Running Hours
// window can hide machinery whose counter has been turned off. Keyed by a
// normalized equipment name so the two independent data sets (Equipment
// Explorer nodes and the Running Hours machinery list) can still be matched
// loosely.
import { api } from '@/services/api/client.js'
import { createStore } from '@/stores/_cache.js'

const STORAGE_KEY = 'ns5-counter-allowed-store'

const store = createStore(STORAGE_KEY, {})

function normalize(name) {
  return (name ?? '')
    .toLowerCase()
    .trim()
    .replace(/\.\.\.$/, '')
    .trim()
}

export async function hydrateCounterAllowed() {
  return store.hydrate(await api.get('/equipment/counter-allowed'))
}

export function loadCounterAllowedStore() {
  const value = store.get()
  return value && typeof value === 'object' ? value : {}
}

export function setCounterAllowed(name, allowed) {
  const key = normalize(name)
  const next = { ...loadCounterAllowedStore(), [key]: allowed }
  return store.set(next, () => api.put('/equipment/counter-allowed', { key, allowed }))
}

// The explicit setting for this equipment, or undefined when the user has
// never chosen one — callers pick their own default in that case (seed
// equipment counts as allowed, newly created equipment as not allowed).
export function getCounterAllowed(name) {
  return loadCounterAllowedStore()[normalize(name)]
}

// Defaults to true (allowed) unless this equipment — or a name it loosely
// matches (one is a prefix of the other, case-insensitive) — was explicitly
// switched to "Not Allow".
export function isCounterAllowed(name) {
  const store = loadCounterAllowedStore()
  const target = normalize(name)
  if (!target) return true

  for (const [key, allowed] of Object.entries(store)) {
    if (allowed === false && (key === target || key.startsWith(target) || target.startsWith(key))) {
      return false
    }
  }
  return true
}
