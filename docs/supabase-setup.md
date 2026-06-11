# Supabase Setup

Octergo uses Supabase as **hosted Postgres only**. Auth stays in the NestJS API (JWT) — you do not need Supabase Auth, Storage, or Realtime for the MVP.

## 1. Get connection strings

In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Settings → Database**:

| Variable | Connection type | Port | Used by |
|----------|-----------------|------|---------|
| `DATABASE_URL` | **Transaction pooler** (or Session pooler) | 6543 | API runtime (`PrismaClient`) |
| `DIRECT_URL` | **Direct connection** | 5432 | `pnpm db:migrate`, `pnpm db:seed` |

Add `?pgbouncer=true` to the pooled URL if using the transaction pooler.

## 2. Configure `.env`

```env
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
```

Copy the real values from the Supabase dashboard — do not commit `.env`.

## 3. Run migrations

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed   # optional
```

Migrations run against `DIRECT_URL`. The API connects via the pooled `DATABASE_URL`.

## 4. Docker Compose

You can skip the `postgres` service when using Supabase:

```bash
docker compose up -d redis   # Redis only, if needed locally
```

Or skip Docker entirely if you are not using Redis yet.

## Notes

- **SSL** is required — Supabase connection strings include it by default.
- **IPv6**: if migrations fail to connect, use the IPv4-compatible pooler host from the dashboard.
- **Row Level Security**: Prisma uses the `postgres` role and bypasses RLS. RLS policies are optional and not required for this MVP.
