import { ping } from '../../database/pool.js'

export async function getHealth(_req, res) {
  try {
    await ping()
    res.json({ status: 'ok', db: 'connected' })
  } catch (error) {
    res.status(503).json({ status: 'degraded', db: 'unavailable', error: error.message })
  }
}
