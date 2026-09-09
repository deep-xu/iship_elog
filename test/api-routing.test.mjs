// Self-check for the serverless entry: the API must answer under /api
// regardless of whether Vercel already stripped the prefix, and the SPA
// rewrite in vercel.json must not swallow /api requests.
//
// Run: node test/api-routing.test.mjs
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createServer } from 'node:http'
import handler from '../api/[...path].mjs'

const server = createServer(handler)
await new Promise((resolve) => server.listen(0, resolve))
const base = `http://127.0.0.1:${server.address().port}`

// /health reaches the router either way. It answers 503 without a database,
// which still proves routing worked — a miss would be a 404 from notFound.
for (const path of ['/api/health', '/health']) {
  const response = await fetch(`${base}${path}`)
  assert.notEqual(response.status, 404, `${path} did not reach the API router`)
}

// Nested paths must reach the router too. The filename is the catch-all that
// decides this: Vercel spells it [...path], and the Next.js [[...path]] form
// silently matched only one segment, so /api/health worked while
// /api/auth/login 404'd in production.
const login = await fetch(`${base}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userId: '', password: '' }),
})
assert.notEqual(login.status, 404, 'nested API paths did not reach the router')

// An unknown API path must still 404, or the catch-all is too greedy.
const unknown = await fetch(`${base}/api/definitely-not-a-route`)
assert.equal(unknown.status, 404, 'unknown API paths should 404')

// The SPA rewrite must exclude /api, otherwise every call returns index.html.
const { rewrites } = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)))
const spa = new RegExp(`^${rewrites[0].source}$`)
assert.ok(!spa.test('/api/auth/login'), 'SPA rewrite must not capture /api paths')
assert.ok(spa.test('/work-orders'), 'SPA rewrite must capture client routes')

await new Promise((resolve) => server.close(resolve))
console.log('ok — api routing')
