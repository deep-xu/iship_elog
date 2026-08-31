import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { ping } from './db.js'

const app = express()
const PORT = Number(process.env.PORT) || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', async (_req, res) => {
  try {
    await ping()
    res.json({ status: 'ok', db: 'connected' })
  } catch (err) {
    res.status(503).json({ status: 'ok', db: 'unavailable', error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`NS5 API listening on http://localhost:${PORT}`)
})
