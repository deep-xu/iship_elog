import { upsertMany } from '../../pool.js'
import { hashPassword } from '../../../utils/password.js'

// The demo crew accounts the login page used to hold in a literal. Only the
// role is refreshed on a re-seed, so a changed password survives.
const ACCOUNTS = [
  { userId: 'mv_superintendent', password: '123456', role: 'Superintendent' },
  { userId: 'mv_ce', password: '123456', role: 'Chief Engineer' },
  { userId: 'mv_3e', password: '123456', role: '3rd Engineer' },
  { userId: 'fleet_manager', password: '123456', role: 'Fleet Manager' },
]

export const name = 'users'

export async function seed() {
  const rows = ACCOUNTS.map(({ userId, password, role }) => ({
    user_id: userId,
    password_hash: hashPassword(password),
    role,
  }))

  return upsertMany('users', ['user_id', 'password_hash', 'role'], rows, {
    updateColumns: ['role'],
  })
}
