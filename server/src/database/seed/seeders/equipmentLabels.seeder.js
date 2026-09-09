import { pool } from '../../pool.js'

// Per-account renames of shared equipment nodes. The node itself stays shared;
// only the label a given account sees changes, so one account renaming the
// Fleet root does not affect anyone else's view.
const OVERRIDES = [
  { nodeId: 'equipment-root', userId: 'fleet_manager', label: 'Fleet A' },
  { nodeId: 'equipment-root', userId: 'mv_superintendent', label: 'Super A' },
]

export const name = 'equipment_node_labels'

export async function seed() {
  for (const { nodeId, userId, label } of OVERRIDES) {
    await pool.query(
      `INSERT INTO equipment_node_labels (node_id, user_id, label) VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE label = VALUES(label)`,
      [nodeId, userId, label],
    )
  }
  return OVERRIDES.length
}
