# Backend API (SIARE) — README

This document describes how to run the backend, required environment variables, and available API endpoints for local development.

## Run (local, sqlite fallback)
- Ensure dependencies are installed:

```bash
npm install
```

- The project supports a local SQLite fallback for development. `backend/.env` contains `DB_CLIENT=sqlite` by default for convenience.

- Start the backend in development mode:

```bash
npm run dev
```

## Required environment variables
- `SESSION_SECRET` — required for signing session JWTs.
- For MySQL (optional): `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`.
- Optional dev flags: `DB_CLIENT` (set to `sqlite` for local), `SQLITE_STORAGE`, `DB_SYNC` (`true`/`false`), `DB_LOGGING` (`true`/`false`), `PORT`.

## API Endpoints (summary)

- Health
  - GET /health — returns { status: 'ok' }

- Public (no auth)
  - GET /api/conferences
  - GET /api/events
  - GET /api/journals
  - GET /api/membership-tiers
  - GET /api/pricing
  - POST /api/inquiries — requires `name` and `email`

- Auth (under /api/admin)
  - POST /api/admin/login
  - POST /api/admin/logout
  - GET /api/admin/session

- Admin (requires auth; mounted under /api/admin)
  - Conferences: GET/POST /conferences, PUT/DELETE /conferences/:id
  - Events: GET/POST /events, PUT/DELETE /events/:id
  - Inquiries: GET /inquiries, PUT/DELETE /inquiries/:id
  - Journals: GET/POST /journals, PUT/DELETE /journals/:id
  - Members: GET/POST /members, PUT/DELETE /members/:id
  - Membership tiers: GET/POST /membership-tiers, PUT/DELETE /membership-tiers/:id
  - Pricing: GET/POST /pricing, PUT/DELETE /pricing/:id

## Testing with Postman
1. Start the server (`npm run dev`).
2. Create a new collection in Postman.
3. Add requests:
   - GET http://localhost:5000/health — should return 200 and `{ status: 'ok' }`.
   - GET http://localhost:5000/api/conferences — likely returns an empty array on first run.
   - POST http://localhost:5000/api/inquiries — set `Content-Type: application/json` and body `{ "name": "Test", "email": "t@test.com" }`.
4. For admin routes, first create an admin (use `npm run seed:admin` or seed via DB) then call `POST /api/admin/login` with admin credentials. Capture the session cookie returned and include it in subsequent admin requests (Postman stores cookies automatically).

## Notes
- I added a local SQLite fallback (`DB_CLIENT=sqlite`) so the server can run without a MySQL server. If you prefer MySQL, unset `DB_CLIENT` and set the MySQL environment variables in `backend/.env`.
