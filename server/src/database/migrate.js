// Applies schema.sql, creating the database first if it does not exist.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from '../config/index.js'
import { createRootConnection } from './pool.js'

const here = path.dirname(fileURLToPath(import.meta.url))

export async function runMigrations() {
  const connection = await createRootConnection()
  try {
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database.name}\`
       CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    )
    await connection.changeUser({ database: config.database.name })

    const sql = await fs.readFile(path.join(here, 'schema.sql'), 'utf8')
    // One statement per query so a failure points at the statement that broke.
    const statements = sql
      .split(/;\s*$/m)
      .map((statement) => statement.trim())
      .filter(
        (statement) =>
          statement && !statement.split('\n').every((line) => line.trim().startsWith('--')),
      )

    for (const statement of statements) {
      await connection.query(statement)
    }

    await applyPatches(connection)
    return statements.length
  } finally {
    await connection.end()
  }
}

// Schema changes made after a database already exists. `CREATE TABLE IF NOT
// EXISTS` will not alter a table that is already there, so anything added to
// an existing table is applied here instead — each patch checks first, so
// running the migration repeatedly is still safe.
const PATCHES = [
  {
    table: 'equipment_nodes',
    column: 'owner_user_id',
    definition: 'VARCHAR(64) NULL AFTER seeded',
    index: { name: 'idx_equipment_owner', columns: '(owner_user_id)' },
  },
]

async function applyPatches(connection) {
  for (const patch of PATCHES) {
    if (!(await hasColumn(connection, patch.table, patch.column))) {
      await connection.query(
        `ALTER TABLE \`${patch.table}\` ADD COLUMN \`${patch.column}\` ${patch.definition}`,
      )
    }
    if (patch.index && !(await hasIndex(connection, patch.table, patch.index.name))) {
      await connection.query(
        `ALTER TABLE \`${patch.table}\` ADD INDEX \`${patch.index.name}\` ${patch.index.columns}`,
      )
    }
  }
}

async function hasColumn(connection, table, column) {
  const [rows] = await connection.query(
    `SELECT 1 FROM information_schema.columns
      WHERE table_schema = ? AND table_name = ? AND column_name = ? LIMIT 1`,
    [config.database.name, table, column],
  )
  return rows.length > 0
}

async function hasIndex(connection, table, indexName) {
  const [rows] = await connection.query(
    `SELECT 1 FROM information_schema.statistics
      WHERE table_schema = ? AND table_name = ? AND index_name = ? LIMIT 1`,
    [config.database.name, table, indexName],
  )
  return rows.length > 0
}
