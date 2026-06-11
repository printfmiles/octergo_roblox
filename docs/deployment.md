# Deployment

## Services

| Service | Port | Description |
|---------|------|-------------|
| web | 5173 (dev) / 80 (prod) | React dashboard |
| api | 3000 | NestJS API |
| bot | — | Discord bot worker |
| postgres | 5432 | Database |
| redis | 6379 | Cache (optional) |

## Environment variables

Copy `.env.example` to `.env` and fill in all values before deploying.

## Build

```bash
pnpm install
pnpm db:generate
pnpm build
```

## Production checklist

- [ ] Set strong `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `BOT_INTERNAL_SECRET`
- [ ] Run `pnpm db:migrate` against production database
- [ ] Deploy API with `DATABASE_URL` pointing to production Postgres
- [ ] Deploy web with `VITE_API_URL` pointing to production API
- [ ] Run bot as a long-running process with Discord token configured
- [ ] Run `pnpm bot:deploy-commands` after command changes

## Docker (local dev)

```bash
docker compose up -d   # Postgres + Redis
```
