// Thin fetch wrapper around the NS5 API.
//
// In development Vite proxies /api to the Express server, so a relative base
// works; set VITE_API_BASE to point a build at a different host.
const BASE = (import.meta.env?.VITE_API_BASE ?? '').replace(/\/$/, '')

// Set to false the first time a request cannot reach the server. The stores
// fall back to localStorage while this is false, so the UI keeps working when
// the API or database is down.
let online = true

export function isApiOnline() {
  return online
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(method, path, body) {
  const response = await fetch(`${BASE}/api${path}`, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  if (!response.ok) {
    let message = `${method} ${path} failed (${response.status})`
    try {
      message = (await response.json()).error ?? message
    } catch {
      // Non-JSON error body; keep the status-based message.
    }
    throw new ApiError(message, response.status)
  }
  return response.status === 204 ? null : response.json()
}

// Network failures flip the app offline; HTTP errors (a 404, a validation
// 400) mean the server answered, so they propagate to the caller instead.
async function send(method, path, body) {
  try {
    const result = await request(method, path, body)
    online = true
    return result
  } catch (error) {
    if (error instanceof ApiError) throw error
    online = false
    throw error
  }
}

export const api = {
  get: (path) => send('GET', path),
  post: (path, body) => send('POST', path, body),
  put: (path, body) => send('PUT', path, body),
  delete: (path) => send('DELETE', path),
}

// Fire-and-forget write used by the stores' synchronous save functions: the
// in-memory cache and localStorage are already updated, so a failed write is
// logged rather than surfaced.
export function pushWrite(promise, label) {
  Promise.resolve(promise).catch((error) => {
    console.warn(`[ns5] ${label} did not reach the database:`, error.message)
  })
}

export async function checkHealth() {
  try {
    const health = await api.get('/health')
    online = health.db === 'connected'
    return online
  } catch {
    online = false
    return false
  }
}
