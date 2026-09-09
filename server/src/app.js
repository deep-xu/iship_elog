// Builds the Express application. Kept separate from server.js so tests can
// import the app without binding a port.
import express from 'express'
import cors from 'cors'
import { config } from './config/index.js'
import apiRoutes from './api/routes/index.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json({ limit: config.requestBodyLimit }))

  app.use('/api', apiRoutes)
  app.use('/api', notFound)

  app.use(errorHandler)

  return app
}

export default createApp
