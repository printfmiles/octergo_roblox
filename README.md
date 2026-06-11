# Octergo Platform

Monorepo for the Octergo MVP — Roblox community management with Discord integration.

## Structure

| Path | Description |
|------|-------------|
| `apps/web` | React dashboard (Vite) |
| `apps/api` | NestJS backend API |
| `apps/bot` | Discord bot worker |
| `packages/database` | Prisma schema, migrations, client |
| `packages/shared` | Shared enums, types, DTOs |
| `packages/config` | Shared config helpers |

## Prerequisites

- Node.js 20+
- pnpm 9+
- [Supabase](https://supabase.com) project (Postgres) — see [docs/supabase-setup.md](docs/supabase-setup.md)
- Docker (optional, for local Redis only)

## Quick start

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Configure Supabase URLs in .env (see docs/supabase-setup.md)

# Verify database connection
pnpm db:check

# Run migrations and generate Prisma client
pnpm db:generate
pnpm db:migrate

# Start all apps in dev mode
pnpm dev
```

## Individual apps

```bash
pnpm dev:web    # http://localhost:5173
pnpm dev:api    # http://localhost:3000
pnpm dev:bot    # Discord bot worker
```

## Bot commands

Register slash commands after configuring Discord env vars:

```bash
pnpm bot:deploy-commands
```

## Docs

See the `docs/` folder for architecture, API endpoints, and deployment guides.
