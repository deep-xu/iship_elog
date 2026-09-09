import { query, withTransaction } from '../../database/pool.js'
import { parseJson } from '../../utils/transform.js'

// The Running Hours window works against one state object: `edits` holds the
// current counter per machine, `history` the readings behind each.
export async function getState() {
  const [counters, history] = await Promise.all([
    query('SELECT machine_key, data FROM running_hours_counters'),
    query('SELECT machine_key, data FROM running_hours_history ORDER BY machine_key, position'),
  ])

  const edits = Object.fromEntries(
    counters.map((row) => [row.machine_key, parseJson(row.data)]),
  )

  const grouped = {}
  for (const row of history) {
    ;(grouped[row.machine_key] ??= []).push(parseJson(row.data))
  }

  return { edits, history: grouped }
}

// Committing counters replaces the whole state, which is what the window does
// on save. One transaction, so a partial write cannot leave the counters and
// their history disagreeing.
export async function replaceState({ edits, history } = {}) {
  const nextEdits = edits && typeof edits === 'object' ? edits : {}
  const nextHistory = history && typeof history === 'object' ? history : {}

  await withTransaction(async (connection) => {
    await connection.execute('DELETE FROM running_hours_counters')
    await connection.execute('DELETE FROM running_hours_history')

    for (const [machineKey, value] of Object.entries(nextEdits)) {
      await connection.execute(
        'INSERT INTO running_hours_counters (machine_key, data) VALUES (?, ?)',
        [machineKey, JSON.stringify(value ?? null)],
      )
    }

    for (const [machineKey, entries] of Object.entries(nextHistory)) {
      const list = Array.isArray(entries) ? entries : []
      for (const [index, entry] of list.entries()) {
        await connection.execute(
          'INSERT INTO running_hours_history (machine_key, position, data) VALUES (?, ?, ?)',
          [machineKey, index, JSON.stringify(entry ?? null)],
        )
      }
    }
  })

  return { edits: nextEdits, history: nextHistory }
}
