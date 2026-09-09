// Shared shape conversions between MySQL rows and the JSON the client reads.

// Maps a row's snake_case columns onto the camelCase keys the React components
// expect, dropping nulls so the components' `?? ''` defaults still apply.
export function toCamel(row, { drop = [] } = {}) {
  const out = {}
  for (const [key, value] of Object.entries(row)) {
    if (drop.includes(key)) continue
    const camel = key.replace(/_([a-z])/g, (_, character) => character.toUpperCase())
    out[camel] = value === null ? '' : value
  }
  return out
}

// Normalizes an incoming value for a nullable text column.
export const asText = (value) =>
  value === undefined || value === null || value === '' ? null : String(value)

// mysql2 hands JSON columns back already parsed, but a column written as a
// string by an older driver would arrive as text — normalize both.
export function parseJson(value, fallback = null) {
  if (value == null) return fallback
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}
