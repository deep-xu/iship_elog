// The bundled PMS reference data still lives with the client, so the seeders
// read it from there rather than keeping a second copy in the server.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

export const DATA_DIR = path.resolve(here, '../../../../client/src/data')

// Two of the client's data modules import JSON with bare specifiers, which
// Node will not resolve, so JSON is read from disk instead of imported.
export const readJson = async (file) =>
  JSON.parse(await fs.readFile(path.join(DATA_DIR, file), 'utf8'))

export const importModule = (file) => import(path.join(DATA_DIR, file))

// --- value coercion shared by the seeders ---------------------------------
export const text = (value) =>
  value === undefined || value === null || value === '' ? null : String(value)

export const num = (value) => {
  if (value === undefined || value === null || value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export const json = (value) => JSON.stringify(value ?? null)
