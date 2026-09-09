// `npm run migrate` — apply the schema, then exit.
import { runMigrations } from './migrate.js'
import { pool } from './pool.js'
import { config } from '../config/index.js'

const count = await runMigrations()
console.log(`Applied ${count} statements to \`${config.database.name}\`.`)
await pool.end()
