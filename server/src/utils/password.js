import crypto from 'node:crypto'

const ITERATIONS = 120000
const KEY_LENGTH = 32
const DIGEST = 'sha256'

// Stored as `pbkdf2$<iterations>$<salt>$<hash>` so the parameters travel with
// the hash and can be raised later without invalidating existing rows.
export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString('hex')
  return `pbkdf2$${ITERATIONS}$${salt}$${hash}`
}

// Recomputes the hash with the salt embedded in `stored` and compares in
// constant time.
export function verifyPassword(password, stored) {
  const [scheme, iterations, salt, expected] = String(stored).split('$')
  if (scheme !== 'pbkdf2' || !salt || !expected) return false

  const actual = crypto
    .pbkdf2Sync(password, salt, Number(iterations), expected.length / 2, DIGEST)
    .toString('hex')
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'))
}
