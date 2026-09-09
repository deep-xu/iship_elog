import mysql from 'mysql2/promise'
import { config } from '../config/index.js'

const baseOptions = {
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  waitForConnections: true,
  connectionLimit: config.database.connectionLimit,
  queueLimit: 0,
  // Keep DECIMAL columns as JS numbers so the API returns 8 rather than "8.00".
  decimalNumbers: true,
  ...(config.database.ssl ? { ssl: { minVersion: 'TLSv1.2' } } : {}),
}

export const pool = mysql.createPool({ ...baseOptions, database: config.database.name })

// A connection that is not bound to the database, used by the migration to
// create it in the first place.
export const createRootConnection = () =>
  mysql.createConnection({ ...baseOptions, multipleStatements: true })

export async function ping() {
  const [rows] = await pool.query('SELECT 1 AS ok')
  return rows[0].ok === 1
}

export async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params)
  return rows
}

// Runs `work` inside a transaction, rolling back if it throws and always
// releasing the connection.
export async function withTransaction(work) {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()
    const result = await work(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

// INSERT ... ON DUPLICATE KEY UPDATE for a list of plain objects, in chunks so
// a large seed does not exceed max_allowed_packet.
export async function upsertMany(table, columns, rows, { chunkSize = 400, updateColumns } = {}) {
  if (!rows.length) return 0

  const updates = (updateColumns ?? columns.filter((column) => column !== 'id'))
    .map((column) => `\`${column}\` = VALUES(\`${column}\`)`)
    .join(', ')
  const columnList = columns.map((column) => `\`${column}\``).join(', ')
  let written = 0

  for (let index = 0; index < rows.length; index += chunkSize) {
    const chunk = rows.slice(index, index + chunkSize)
    const placeholders = chunk.map(() => `(${columns.map(() => '?').join(', ')})`).join(', ')
    const values = chunk.flatMap((row) => columns.map((column) => row[column] ?? null))

    await pool.query(
      `INSERT INTO \`${table}\` (${columnList}) VALUES ${placeholders}` +
        (updates ? ` ON DUPLICATE KEY UPDATE ${updates}` : ''),
      values,
    )
    written += chunk.length
  }
  return written
}
