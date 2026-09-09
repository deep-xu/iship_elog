// Seed orchestrator. Applies the schema, then runs each seeder in order —
// order matters because equipment nodes reference their parents.
import { runMigrations } from '../migrate.js'
import * as users from './seeders/users.seeder.js'
import * as equipment from './seeders/equipment.seeder.js'
import * as maintenancePlan from './seeders/maintenancePlan.seeder.js'
import * as standardJobs from './seeders/standardJobs.seeder.js'
import * as workOrderHistory from './seeders/workOrderHistory.seeder.js'
import * as spareParts from './seeders/spareParts.seeder.js'
import * as ownedVessels from './seeders/ownedVessels.seeder.js'
import * as equipmentLabels from './seeders/equipmentLabels.seeder.js'
import { vesselSeeder, surveySeeder } from './seeders/certificates.seeder.js'

const SEEDERS = [
  users,
  equipment,
  ownedVessels,        // after `equipment`: hangs off the Fleet root it creates
  equipmentLabels,     // after both: its rows reference equipment_nodes
  maintenancePlan,
  standardJobs,
  workOrderHistory,
  vesselSeeder,
  surveySeeder,
  spareParts,
]

export async function runSeed({ migrate = true, log = console.log } = {}) {
  if (migrate) await runMigrations()

  const results = []
  for (const seeder of SEEDERS) {
    const count = await seeder.seed()
    results.push({ name: seeder.name, count })
    log(`  ${seeder.name.padEnd(24)} ${count} rows`)
  }
  return results
}
