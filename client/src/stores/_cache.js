// Shared plumbing for the API-backed stores.
//
// Every store keeps the synchronous `load…()` / `save…()` signatures the
// windows already call. Reads come from an in-memory cache filled once at
// startup (see api/bootstrap.js); writes update the cache immediately, mirror
// to localStorage as an offline fallback, and are pushed to MySQL in the
// background.
import { pushWrite } from '@/services/api/client.js'

export function readLocal(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

export function writeLocal(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage can be unavailable in private or restricted browser contexts.
  }
}

// A cache that starts from localStorage so the first synchronous read has
// something sensible even before hydration finishes.
//
// Pass `persist: false` for anything scoped to one account. localStorage is
// shared by every account using this browser, so caching per-account data
// there would let the next user to sign in see the previous user's rows
// whenever the database is unreachable. Those stores stay in memory and fall
// back to the bundled shared data instead.
export function createStore(storageKey, fallback, { persist = true } = {}) {
  let value = persist ? readLocal(storageKey, fallback) : fallback
  let hydrated = false

  const save = (next) => {
    if (persist) writeLocal(storageKey, next)
  }

  return {
    get: () => value,
    isHydrated: () => hydrated,
    // Called by bootstrap with the rows from MySQL.
    hydrate(next) {
      value = next ?? fallback
      hydrated = true
      save(value)
      return value
    },
    // Called by the windows' save handlers.
    set(next, write) {
      value = next
      save(value)
      if (write) pushWrite(write(value), storageKey)
      return value
    },
  }
}
