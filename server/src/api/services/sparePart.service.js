import { query } from '../../database/pool.js'
import { toCamel } from '../../utils/transform.js'
import { HttpError } from '../../middleware/errorHandler.js'

const EXACT_FILTERS = [
  ['partNo', 'part_no'],
  ['component', 'component'],
  ['majorSystem', 'major_system'],
  ['status', 'status'],
  ['ship', 'ship'],
]

const MAX_LIMIT = 5000
const DEFAULT_LIMIT = 500

// The inventory is large, so this always pages rather than returning the lot.
export async function listParts(filters = {}) {
  const clauses = []
  const params = []

  for (const [param, column] of EXACT_FILTERS) {
    if (filters[param]) {
      clauses.push(`${column} = ?`)
      params.push(filters[param])
    }
  }
  if (filters.search) {
    clauses.push('(part_no LIKE ? OR description LIKE ? OR maker LIKE ?)')
    params.push(...Array(3).fill(`%${filters.search}%`))
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
  // Clamped and coerced to integers here, so they are safe to inline — LIMIT
  // and OFFSET cannot be bound as placeholders in a prepared statement.
  const limit = Math.min(Math.max(Number(filters.limit) || DEFAULT_LIMIT, 1), MAX_LIMIT)
  const offset = Math.max(Number(filters.offset) || 0, 0)

  const [rows, counted] = await Promise.all([
    query(
      `SELECT * FROM spare_parts ${where} ORDER BY part_no, id LIMIT ${limit} OFFSET ${offset}`,
      params,
    ),
    query(`SELECT COUNT(*) AS total FROM spare_parts ${where}`, params),
  ])

  return {
    total: counted[0].total,
    limit,
    offset,
    rows: rows.map((row) => toCamel(row, { drop: ['id', 'updated_at'] })),
  }
}

export async function updateStock(partNo, stockQty) {
  const quantity = Number(stockQty)
  if (!Number.isFinite(quantity)) throw new HttpError(400, 'stockQty must be a number.')

  const result = await query(
    `UPDATE spare_parts
        SET stock_qty = ?, total_value = ROUND(? * COALESCE(unit_cost, 0), 2)
      WHERE part_no = ?`,
    [quantity, quantity, partNo],
  )
  if (!result.affectedRows) throw new HttpError(404, 'Not found.')

  return { partNo, stockQty: quantity }
}
