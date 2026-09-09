// Simple Tasks created from the Simple Task window, stored in MySQL so the
// list survives closing the window, navigating away, or switching browsers.
import { api } from '@/services/api/client.js'
import { createStore } from '@/stores/_cache.js'

export const SIMPLE_TASKS_STORAGE_KEY = 'ns5-simple-tasks'

const store = createStore(SIMPLE_TASKS_STORAGE_KEY, [])

export async function hydrateSimpleTasks() {
  return store.hydrate(await api.get('/simple-tasks'))
}

export function loadSimpleTasks() {
  const rows = store.get()
  return Array.isArray(rows) ? rows : []
}

export function saveSimpleTasks(rows) {
  const next = Array.isArray(rows) ? rows : []
  return store.set(next, (value) => api.put('/simple-tasks', { rows: value }))
}
