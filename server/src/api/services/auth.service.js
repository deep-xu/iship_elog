import { query } from '../../database/pool.js'
import { verifyPassword } from '../../utils/password.js'
import { HttpError } from '../../middleware/errorHandler.js'

export async function authenticate(userId, password) {
  const normalizedId = String(userId ?? '').trim().toLowerCase()

  const rows = await query('SELECT user_id, password_hash, role FROM users WHERE user_id = ?', [
    normalizedId,
  ])
  const account = rows[0]

  // The same message either way, so the response cannot be used to tell
  // whether a user ID exists.
  if (!account || !verifyPassword(String(password ?? ''), account.password_hash)) {
    throw new HttpError(401, 'Incorrect user ID or password.')
  }
  return { userId: account.user_id, role: account.role }
}
