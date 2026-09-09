import { query } from '../../database/pool.js'
import { parseJson } from '../../utils/transform.js'
import { HttpError } from '../../middleware/errorHandler.js'

// Saved state for the detail windows. Each window owns one key and defines its
// own payload shape, so these are stored as JSON rather than typed columns.

// Keys look like `ns5-equipment-detail-<id>`; the middle segment is a useful
// type to filter on when a window wants every document of one kind.
function deriveType(key) {
  const match = /^ns5-([a-z-]+?)(?:-[a-z0-9]+)*$/.exec(key)
  return match ? match[1] : 'generic'
}

export async function listDocuments(type) {
  const rows = type
    ? await query('SELECT doc_key, data FROM documents WHERE doc_type = ?', [type])
    : await query('SELECT doc_key, data FROM documents')

  return Object.fromEntries(rows.map((row) => [row.doc_key, parseJson(row.data, {})]))
}

export async function getDocument(key) {
  const rows = await query('SELECT data FROM documents WHERE doc_key = ?', [key])
  if (!rows.length) throw new HttpError(404, 'Not found.')
  return parseJson(rows[0].data, {})
}

export async function saveDocument(key, data, type) {
  await query(
    `INSERT INTO documents (doc_key, doc_type, data) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE doc_type = VALUES(doc_type), data = VALUES(data)`,
    [key, String(type || deriveType(key)), JSON.stringify(data ?? {})],
  )
  return { key }
}

export async function deleteDocument(key) {
  await query('DELETE FROM documents WHERE doc_key = ?', [key])
}
