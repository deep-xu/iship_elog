import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const src = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src')

export default defineConfig({
  plugins: [react()],
  resolve: {
    // `@/...` always means `src/...`, so moving a file never rewrites the
    // imports that point at it.
    alias: { '@': src },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
