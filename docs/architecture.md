# Architecture

## Overview

Octergo is a pnpm monorepo with three deployable applications and three shared packages.

```
┌─────────┐     HTTP      ┌─────────┐     Prisma    ┌──────────┐
│  web    │ ────────────► │   api   │ ────────────► │ Postgres │
└─────────┘               └────┬────┘               └──────────┘
                               │
                          HTTP │ (BOT_INTERNAL_SECRET)
                               │
                          ┌────▼────┐
                          │   bot   │ ──► Discord API
                          └─────────┘
```

## Request flow (Discord command)

1. User runs `/verify` in Discord
2. Bot receives the slash command interaction
3. Bot calls `POST /bot-internal/verify` on the API with `x-bot-secret` header
4. API validates data and updates the database
5. API returns result
6. Bot replies to the user in Discord

## Shared packages

| Package | Used by |
|---------|---------|
| `@octergo/shared` | web, api, bot |
| `@octergo/database` | api |
| `@octergo/config` | api, bot |

## Key design decisions

- **Bot does not access the database directly** — all data flows through the API
- **Prisma lives in `packages/database`** — single schema, versioned migrations
- **Internal bot routes** are protected by `BOT_INTERNAL_SECRET`
