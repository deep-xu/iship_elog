# iship_elog

NS5 marine operations console — a React (Vite) client backed by a Node/Express
API on MySQL.

## Layout

| Path      | What it is                                    |
| --------- | --------------------------------------------- |
| `client/` | React + Vite front end (port 5173)            |
| `server/` | Express API and MySQL schema/seed (port 4000) |

### Server — layered

```
server/src/
  config/            environment, read once and defaulted
  database/
    pool.js          connection pool, query/transaction/upsert helpers
    schema.sql       DDL
    migrate.js       schema runner
    seed/seeders/    one seeder per domain
  api/
    routes/          URL wiring only
    controllers/     request in, response out
    services/        business logic and SQL
  middleware/        async wrapper, error handler
  utils/             shape conversion, password hashing
  app.js             Express assembly (no port binding)
  server.js          process entry point
```

A request flows `routes -> controllers -> services -> database`. Services are
the only layer that writes SQL, and they throw `HttpError` for anything the
client should see; everything else becomes a 500 with the detail logged, not
returned.

### Client — feature-first

```
client/src/
  app/               App shell and the window registry
  components/
    layout/          nav, rails, tab bars, page frames
    ui/              shared primitives (window chrome, icons, query shell)
  features/
    auth/ equipment/ work-management/ certificates/
    hsqe/ inventory/ purchasing/ reports/ setup/
      components/    windows belonging to that feature
  services/api/      fetch client and the startup hydration
  stores/            API-backed caches with synchronous read APIs
  data/              bundled reference data and column definitions
  styles/
```

Imports use the `@` alias for anything outside the current folder
(`@/stores/simpleTasksStore.js`), configured in `vite.config.js` and
`jsconfig.json`, so moving a file never rewrites the imports pointing at it.

## First-time setup

MySQL 8 must be running. Copy the example environment file and fill in your
credentials:

```bash
cp server/.env.example server/.env
```

Install dependencies and create + populate the database. `seed` applies the
schema first, so it is the only command needed:

```bash
npm install --prefix server && npm run seed --prefix server
```

That creates the `ns5` database, its 15 tables, and imports the bundled PMS
data: the equipment hierarchy, maintenance plan, standard jobs, completed-job
history, certificates and spare-part inventory. It is safe to re-run — every
insert is an upsert keyed on the natural key, and rows you created through the
UI are never overwritten.

## Running

Two processes, in separate terminals:

```bash
npm run dev --prefix server
```

```bash
npm run dev --prefix client
```

The client dev server proxies `/api` to the API on port 4000, so open
http://localhost:5173.

## Accounts

Seeded demo logins, all with password `123456`: `mv_superintendent`, `mv_ce`,
`mv_3e`, `fleet_manager`. Passwords are stored only as salted PBKDF2 hashes.

### Per-account equipment

`equipment_nodes.owner_user_id` scopes the hierarchy. `NULL` means shared —
every account sees the node. A user id restricts that node and its whole branch
to one account, and a node added under an owned branch inherits the owner, so a
child can never become visible without its parent.

`fleet_manager` owns two extra vessels, MT Atlantic and MV Trinity, seeded from
`src/database/seed/data/fleetManagerVessels.json`. Every other account sees only
the shared MV Genco hierarchy.

Because visibility depends on who signed in, the client hydrates its stores
*after* login rather than on page load, and equipment reads carry `?userId=`.

## How persistence works

Every window reads its data synchronously during render, so the client fills a
set of in-memory stores from MySQL once at startup (`client/src/api/bootstrap.js`)
before the first paint. Saves update the cache immediately and are written to
the API in the background, so the UI stays responsive.

If the API or database is unreachable the app falls back to the last data
cached in `localStorage`, shows a banner saying changes will not be saved, and
keeps working read-only.

## API

| Route                        | Covers                                    |
| ---------------------------- | ----------------------------------------- |
| `/api/auth/login`            | Sign-in against the `users` table         |
| `/api/equipment/*`           | Equipment Structure tree, counter setting |
| `/api/maintenance-plan`      | Maintenance Plan grid                     |
| `/api/standard-jobs`         | Standard Jobs and their Related Jobs      |
| `/api/work-orders`           | Work Orders and completed-job history     |
| `/api/simple-tasks`          | Simple Tasks                              |
| `/api/running-hours`         | Running Hours counters and history        |
| `/api/certificates/*`        | Vessel and Survey certificates            |
| `/api/spare-parts`           | Spare-part inventory (paged)              |
| `/api/documents/*`           | Saved detail-window form state            |
