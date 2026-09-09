import { query } from '../../database/pool.js'
import { asText } from '../../utils/transform.js'
import { HttpError } from '../../middleware/errorHandler.js'

// Nodes with no owner are the shared hierarchy every account sees; an owned
// node (and everything beneath it) belongs to one account only.
const VISIBLE_TO = '(n.owner_user_id IS NULL OR n.owner_user_id = ?)'

// The whole hierarchy rebuilt into the nested shape the Equipment Explorer
// renders. Rows arrive ordered by depth, so a parent is always seen before its
// children and one pass is enough.
export async function getTree(userId = null) {
  const rows = await query(
    `SELECT n.id, n.parent_id, COALESCE(o.label, n.label) AS label,
            n.category, n.part_no, n.maker, n.depth
       FROM equipment_nodes n
       LEFT JOIN equipment_node_labels o ON o.node_id = n.id AND o.user_id = ?
      WHERE ${VISIBLE_TO}
      ORDER BY n.depth, n.sort_order, n.id`,
    [userId, userId],
  )

  const byId = new Map()
  let root = null

  for (const row of rows) {
    const node = {
      id: row.id,
      label: row.label,
      level: row.depth,
      category: row.category ?? '',
      partNo: row.part_no ?? '',
      makerRemarks: row.maker ?? '',
      children: [],
    }
    byId.set(node.id, node)

    if (row.parent_id === null) root = node
    else byId.get(row.parent_id)?.children.push(node)
  }
  return root
}

// User-added nodes replayed as the `{ parentId, draft }` additions the client's
// tree helpers apply on top of the seeded hierarchy.
export async function listAdditions(userId = null) {
  const rows = await query(
    `SELECT n.parent_id, n.label, n.category, n.part_no, n.maker
       FROM equipment_nodes n WHERE n.seeded = 0 AND ${VISIBLE_TO}
       ORDER BY n.depth, n.sort_order, n.id`,
    [userId],
  )

  return rows.map((row) => ({
    parentId: row.parent_id,
    draft: {
      label: row.label,
      category: row.category ?? '',
      partNo: row.part_no ?? '',
      makerRemarks: row.maker ?? '',
    },
  }))
}

export async function createNode({ id, parentId, label, category, partNo, makerRemarks }) {
  if (!id || !parentId || !label) {
    throw new HttpError(400, 'id, parentId and label are required.')
  }

  const parent = await query('SELECT depth, owner_user_id FROM equipment_nodes WHERE id = ?', [
    parentId,
  ])
  if (!parent.length) throw new HttpError(404, `Unknown parent ${parentId}.`)

  const siblings = await query(
    'SELECT COALESCE(MAX(sort_order), -1) AS max_order FROM equipment_nodes WHERE parent_id = ?',
    [parentId],
  )

  await query(
    `INSERT INTO equipment_nodes
       (id, parent_id, label, category, part_no, maker, depth, sort_order, seeded, owner_user_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
     ON DUPLICATE KEY UPDATE label = VALUES(label), category = VALUES(category),
       part_no = VALUES(part_no), maker = VALUES(maker)`,
    [
      id,
      parentId,
      label,
      asText(category),
      asText(partNo),
      asText(makerRemarks),
      parent[0].depth + 1,
      siblings[0].max_order + 1,
      // Inherited, so a node added under an owned vessel stays private to that
      // account and never becomes an orphan for anyone else.
      parent[0].owner_user_id,
    ],
  )
  return { id }
}

// Removing a node takes its whole branch with it (ON DELETE CASCADE). Seeded
// nodes are protected so the PMS import stays intact.
export async function deleteNode(id) {
  const rows = await query('SELECT seeded FROM equipment_nodes WHERE id = ?', [id])
  if (!rows.length) throw new HttpError(404, 'Not found.')
  if (rows[0].seeded) throw new HttpError(409, 'Seeded equipment cannot be deleted.')

  await query('DELETE FROM equipment_nodes WHERE id = ?', [id])
}

export async function getCounterAllowedMap() {
  const rows = await query('SELECT equipment_key, allowed FROM counter_allowed')
  return Object.fromEntries(rows.map((row) => [row.equipment_key, Boolean(row.allowed)]))
}

export async function setCounterAllowed(key, allowed) {
  if (!key) throw new HttpError(400, 'key is required.')

  await query(
    `INSERT INTO counter_allowed (equipment_key, allowed) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE allowed = VALUES(allowed)`,
    [String(key), allowed ? 1 : 0],
  )
  return { key, allowed: Boolean(allowed) }
}
