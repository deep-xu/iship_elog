import { query, withTransaction } from '../../database/pool.js'
import { asText, parseJson } from '../../utils/transform.js'
import { HttpError } from '../../middleware/errorHandler.js'

const toTask = (row) => ({ ...parseJson(row.data, {}), id: row.id })

export async function listTasks() {
  const rows = await query('SELECT * FROM simple_tasks ORDER BY position, created_at')
  return rows.map(toTask)
}

// The Simple Task window edits its grid as a whole and saves the result, so
// the list is replaced in one transaction and `position` preserves the order
// the user sees.
export async function replaceTasks(rows = []) {
  const tasks = Array.isArray(rows) ? rows : []

  await withTransaction(async (connection) => {
    await connection.execute('DELETE FROM simple_tasks')

    for (const [index, row] of tasks.entries()) {
      const id = String(row.id ?? `task-${Date.now()}-${index}`)
      await connection.execute(
        `INSERT INTO simple_tasks (id, title, status, ship, data, position)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          id,
          asText(row.taskName ?? row.title ?? row.description),
          asText(row.status),
          asText(row.ship),
          JSON.stringify({ ...row, id }),
          index,
        ],
      )
    }
  })

  return listTasks()
}

export async function deleteTask(id) {
  const result = await query('DELETE FROM simple_tasks WHERE id = ?', [id])
  if (!result.affectedRows) throw new HttpError(404, 'Not found.')
}
