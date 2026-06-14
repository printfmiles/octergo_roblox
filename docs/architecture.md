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

## Request flow (Discord verification)

1. User opens **Verify Discord** on the web dashboard
2. API generates a one-time code (e.g. `OCT-8K2M4Q`, expires in 15 minutes)
3. User runs `/verify code:OCT-8K2M4Q` in Discord
4. Bot receives the slash command with the code and the user's Discord ID (from Discord, not typed manually)
5. Bot calls `POST /bot-internal/discord/verify` on the API with `x-bot-secret` header
6. API validates the code and links the Discord user ID to the Octergo account
7. Web dashboard polls `GET /verification/discord/status` until verified

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
