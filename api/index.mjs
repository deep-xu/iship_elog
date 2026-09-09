// Vercel serverless entry point for the NS5 API.
//
// An Express app is already a (req, res) handler, so the same app server.js
// binds to a port is reused here rather than duplicated. A rewrite in
// vercel.json sends every /api/... request to this one function, which is why
// the original path survives in x-vercel-original-path.
import { createApp } from '../server/src/app.js'

const app = createApp()

export default function handler(req, res) {
  // The rewrite rewrites req.url to /api, losing the route the client asked
  // for; the header keeps it. Fall back to req.url for a direct invocation.
  const original = req.headers['x-vercel-original-path']
  if (original) req.url = original
  // app.js mounts its routers under /api, so restore the prefix when the
  // platform has stripped it.
  if (!req.url.startsWith('/api')) req.url = `/api${req.url}`
  return app(req, res)
}
