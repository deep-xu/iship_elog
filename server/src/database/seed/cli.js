// `npm run seed` — apply the schema and load the reference data, then exit.
import { runSeed } from './index.js'
import { pool } from '../pool.js'

await runSeed()
console.log('Seed complete.')
await pool.end()
