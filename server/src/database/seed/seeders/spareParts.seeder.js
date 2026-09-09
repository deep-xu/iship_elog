import { pool, upsertMany } from '../../pool.js'
import { importModule, text, num } from '../sourceData.js'

export const name = 'spare_parts'

export async function seed() {
  const { SPARE_PART_INVENTORY } = await importModule('sparePartInventory.js')

  await pool.query('DELETE FROM spare_parts')

  const rows = SPARE_PART_INVENTORY.map((row) => ({
    ship: text(row.ship),
    part_no: text(row.partNo),
    description: text(row.description),
    category: text(row.category),
    maker: text(row.maker),
    major_system: text(row.majorSystem),
    sub_system: text(row.subSystem),
    component: text(row.component),
    unit: text(row.unit),
    stock_qty: num(row.stockQty),
    min_stock: num(row.minStock),
    reorder_qty: num(row.reorderQty),
    unit_cost: num(row.unitCost),
    total_value: num(row.totalValue),
    location: text(row.location),
    status: text(row.status),
  }))

  return upsertMany('spare_parts', Object.keys(rows[0]), rows, { chunkSize: 200 })
}
