// Saved state for the detail windows — the Equipment and Part forms, the
// Standard Job form, the explorer layout, the certificate dashboard's filters
// and bookmarks. Each window owns one key and defines its own payload shape,
// so these are stored as JSON documents rather than typed columns.
//
// Reads stay synchronous (the windows read saved values during render), served
// from a cache filled at startup; writes go to MySQL in the background.
import { api } from '@/services/api/client.js'
import { createStore } from '@/stores/_cache.js'

const CACHE_KEY = 'ns5-documents'

const store = createStore(CACHE_KEY, {})

export async function hydrateDocuments() {
  return store.hydrate(await api.get('/documents'))
}

function all() {
  const value = store.get()
  return value && typeof value === 'object' ? value : {}
}

// The saved document for this key, or `fallback` when the window has never
// been saved.
export function loadDocument(key, fallback = {}) {
  const document = all()[key]
  return document === undefined || document === null ? fallback : document
}

// Returns true when the write was accepted locally — the windows use this to
// decide between "All changes saved." and a storage-unavailable message.
export function saveDocument(key, data) {
  try {
    store.set({ ...all(), [key]: data }, () =>
      api.put(`/documents/${encodeURIComponent(key)}`, data),
    )
    return true
  } catch {
    return false
  }
}

export function deleteDocument(key) {
  const next = { ...all() }
  delete next[key]
  store.set(next, () => api.delete(`/documents/${encodeURIComponent(key)}`))
}
