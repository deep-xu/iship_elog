import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool, upsertMany } from '../../pool.js'
import { text } from '../sourceData.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const SOURCE = path.resolve(here, '../data/ownedVessels.json')

// Vessels that belong to a single account. Their nodes carry `owner_user_id`
// and the equipment API filters on it, so every other account sees only the
// shared hierarchy. Each entry in the source file names its own owner.
//
// Matches the slug rule the client's tree helpers use, so an id generated here
// is the same id the UI would compute for the node.
const slugify = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const name = 'equipment_nodes (owned)'

export async function seed() {
  const vessels = JSON.parse(await fs.readFile(SOURCE, 'utf8'))

  // Owned vessels hang off the Fleet root, alongside the shared MV Genco.
  const [roots] = await pool.query('SELECT id FROM equipment_nodes WHERE parent_id IS NULL LIMIT 1')
  if (!roots.length) throw new Error('Equipment root missing — run the equipment seeder first.')
  const rootId = roots[0].id

  // Ordered after the shared vessels. Only shared siblings are counted, so the
  // position stays the same however many times the seed is re-run.
  const [siblings] = await pool.query(
    `SELECT COALESCE(MAX(sort_order), -1) AS max_order
       FROM equipment_nodes WHERE parent_id = ? AND owner_user_id IS NULL`,
    [rootId],
  )

  const rows = []
  const seen = new Set()
  let vesselOrder = siblings[0].max_order + 1

  for (const vessel of vessels) {
    const vesselId = `${rootId}-${slugify(vessel.label)}`

    rows.push({
      id: vesselId,
      parent_id: rootId,
      label: vessel.label,
      category: 'Vessel',
      part_no: null,
      maker: text(vessel.title),
      depth: 1,
      sort_order: vesselOrder++,
      seeded: 1,
      owner_user_id: vessel.owner,
    })
    seen.add(vesselId)

    // The sheet encodes depth in its Level column, so a stack of the most
    // recent node at each level gives every row its parent.
    const stack = [{ id: vesselId, level: 0 }]
    const orderByParent = new Map()

    for (const node of vessel.nodes) {
      while (stack.length && stack[stack.length - 1].level >= node.level) {
        stack.pop()
      }
      const parent = stack[stack.length - 1] ?? { id: vesselId, level: 0 }

      let id = `${parent.id}-${slugify(node.label)}`
      // The sheets repeat a label under one parent (a component and the spare
      // named after it); suffix so each row keeps its own id.
      if (seen.has(id)) {
        let suffix = 2
        while (seen.has(`${id}-${suffix}`)) suffix += 1
        id = `${id}-${suffix}`
      }
      seen.add(id)

      const order = orderByParent.get(parent.id) ?? 0
      orderByParent.set(parent.id, order + 1)

      rows.push({
        id,
        parent_id: parent.id,
        label: node.label,
        category: text(node.category),
        part_no: text(node.partNo),
        maker: text(node.makerRemarks),
        depth: node.level + 1,
        sort_order: order,
        seeded: 1,
        owner_user_id: vessel.owner,
      })

      stack.push({ id, level: node.level })
    }
  }

  // chunkSize 1 keeps parents strictly ahead of their children.
  return upsertMany(
    'equipment_nodes',
    ['id','parent_id','label','category','part_no','maker','depth','sort_order','seeded','owner_user_id'],
    rows,
    { chunkSize: 1 },
  )
}
