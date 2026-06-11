# Supabase + Prisma Setup

Octergo uses Supabase as **hosted Postgres only**. Auth stays in the NestJS API (JWT).

## Golden rule

**One `.env` file at the monorepo root only.**

```
octergo-dashboard-src/.env   ✅ use this
packages/database/.env       ❌ never create this
```

Duplicate env files cause Prisma, the API, and migrations to read different connection strings.

## Connection strings

From [Supabase Dashboard](https://supabase.com/dashboard) → **Settings → Database**:

| Variable | Purpose | Host | Port |
|----------|---------|------|------|
| `DATABASE_URL` | API runtime (`PrismaClient`) | `*.pooler.supabase.com` | **6543** (transaction pooler) |
| `DIRECT_URL` | Migrations (`pnpm db:migrate`) | `db.<ref>.supabase.co` | **5432** (direct) |

### Example `.env`

```env
# Runtime — transaction pooler
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require

# Migrations — direct connection (NOT the pooler host)
DIRECT_URL=postgresql://postgres.[ref]:[password]@db.[ref].supabase.co:5432/postgres?sslmode=require
```

Replace `[ref]`, `[password]`, and `[region]` from your dashboard.

### URL-encoding passwords

If your password contains `@`, `#`, `/`, or `%`, URL-encode them:

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `#` | `%23` |
| `/` | `%2F` |

## How env loading works in this repo

| Command | Env source |
|---------|------------|
| `pnpm db:migrate` | Root `.env` via `dotenv -e .env` + `prisma.config.ts` |
| `pnpm db:check` | Root `.env` via `dotenv -e .env` |
| `pnpm dev:api` | Root `.env` via `dotenv -e .env` + `env-bootstrap.ts` fallback |
| `pnpm dev:bot` | Root `.env` via `dotenv -e .env` + `env-bootstrap.ts` fallback |

`packages/database/prisma.config.ts` always loads `../../.env` so Prisma CLI commands are consistent even without the dotenv wrapper.

## Setup steps

```bash
cp .env.example .env
# Fill in DATABASE_URL and DIRECT_URL from Supabase dashboard

pnpm install
pnpm db:check      # verify connection before migrating
pnpm db:generate
pnpm db:migrate
pnpm dev
```

## Troubleshooting

### Dashboard works but `pnpm db:migrate` fails

Classic env mismatch. Check:

1. Only one `.env` exists (at repo root)
2. `DIRECT_URL` uses `db.<ref>.supabase.co`, not the pooler host
3. No trailing `"` quotes on URL lines
4. Project is not paused in Supabase dashboard

### `P1013` — invalid database string

- Wrong query params (e.g. `pgbouncer=true` on direct URL)
- Unescaped special characters in password
- Trailing quotes or spaces in `.env`

### `P1001` — can't reach database server

- Wrong port (6543 for pooler, 5432 for direct)
- Supabase project paused — restore it in dashboard
- Firewall blocking outbound Postgres ports

### Registration / API fails but web loads

The API cannot start without a working `DATABASE_URL`. Run:

```bash
pnpm db:check
pnpm dev:api
```

Confirm you see `API running on http://localhost:3000`.

## Pooler vs direct (why both?)

```
┌─────────────┐     DATABASE_URL (pooler)     ┌──────────┐
│  NestJS API │ ─────────────────────────────►│ Supabase │
└─────────────┘                               │ Postgres │
                                              └──────────┘
┌─────────────┐     DIRECT_URL (direct)            ▲
│ prisma      │ ─────────────────────────────────────┘
│ migrate dev │
└─────────────┘
```

- **Pooler** handles many short-lived connections efficiently (good for serverless; fine for API too)
- **Direct** is required for migrations, schema changes, and some DDL operations

## Notes

- **SSL** — always include `?sslmode=require`
- **RLS** — Prisma uses the `postgres` role and bypasses RLS (fine for MVP)
- **IPv6 issues** — if direct host fails, try the IPv4 pooler session string (port 5432) as `DIRECT_URL` temporarily
