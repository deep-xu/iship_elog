import { upsertMany } from '../../pool.js'
import { importModule, text } from '../sourceData.js'

export const name = 'equipment_nodes'

export async function seed() {
  const { EQUIPMENT_TREE } = await importModule('equipment.js')

  const rows = []
  const seen = new Set()

  // Depth-first, so parents are always inserted before their children — the
  // self-referencing foreign key requires it.
  const walk = (node, parentId, depth, order) => {
    if (seen.has(node.id)) return // the source tree can repeat a slug; first wins
    seen.add(node.id)

    rows.push({
      id: node.id,
      parent_id: parentId,
      label: node.label,
      category: text(node.category),
      part_no: text(node.partNo),
      maker: text(node.makerRemarks),
      depth,
      sort_order: order,
      seeded: 1,
    })

    node.children?.forEach((child, index) => walk(child, node.id, depth + 1, index))
  }
  walk(EQUIPMENT_TREE, null, 0, 0)

  // chunkSize 1 keeps parents strictly ahead of children within the batch.
  return upsertMany(
    'equipment_nodes',
    ['id', 'parent_id', 'label', 'category', 'part_no', 'maker', 'depth', 'sort_order', 'seeded'],
    rows,
    { chunkSize: 1 },
  )
}
