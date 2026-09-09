// Vercel serverless entry point for the NS5 API.
//
// An Express app is already a (req, res) handler, so the same app server.js
// binds to a port is reused here rather than duplicated. The catch-all
// filename routes every /api/... request into this one function.
import { createApp } from '../server/src/app.js'

const app = createApp()

export default function handler(req, res) {
  // app.js mounts its routers under /api. Vercel strips the directory prefix
  // for some invocations, so restore it when it is missing.
  if (!req.url.startsWith('/api')) req.url = `/api${req.url}`
  return app(req, res)
}
