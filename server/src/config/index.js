// Single place where environment variables are read and defaulted, so no
// module reaches for process.env directly.
import 'dotenv/config'

export const config = {
  port: Number(process.env.PORT) || 4000,
  env: process.env.NODE_ENV || 'development',

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'ns5',
    connectionLimit: Number(process.env.DB_POOL_SIZE) || 10,
    // Managed MySQL (Aiven, RDS, PlanetScale) requires TLS; a local server
    // usually has none. Off unless DB_SSL is set.
    ssl: process.env.DB_SSL === 'true',
    // Providers that sign with their own CA (Aiven among them) need that
    // certificate here, otherwise the connection is refused as untrusted.
    sslCa: process.env.DB_SSL_CA || null,
  },

  // Detail windows can save sizeable form documents, so the body cap is well
  // above Express' 100kb default.
  requestBodyLimit: process.env.REQUEST_BODY_LIMIT || '10mb',
}

export default config
