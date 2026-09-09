import { config } from '../config/index.js'

// An error carrying an intended HTTP status, thrown by the service layer.
export class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export const notFound = (req, res) =>
  res.status(404).json({ error: `Unknown endpoint: ${req.method} ${req.originalUrl}` })

// Central error handler. Deliberate HttpErrors keep their message; anything
// else is logged in full but reported generically, so a SQL error never
// reaches the browser verbatim.
// eslint-disable-next-line no-unused-vars -- Express identifies this by arity.
export function errorHandler(error, _req, res, _next) {
  const status = error.status ?? 500

  if (status >= 500) {
    console.error(error)
  }

  res.status(status).json({
    error: status >= 500 ? 'Internal server error.' : error.message,
    ...(config.env === 'development' && status >= 500 ? { detail: error.message } : {}),
  })
}
