# Database Schema

Schema is defined in `packages/database/prisma/schema.prisma`.

## Core models

| Model | Purpose |
|-------|---------|
| `User` | Platform accounts with Roblox/Discord verification state |
| `Subscription` | Plan limits per user (Starter, Pro, Enterprise) |
| `Community` | Links a Roblox group to a Discord guild |
| `Member` | Roblox group member synced into a community |
| `RoleMapping` | Maps Roblox rank IDs to Discord role IDs |
| `Session` | Scheduled community sessions |
| `AuditLog` | Moderation and sync action history |

## Enums

- `UserRole` — USER, ADMIN
- `VerificationStatus` — PENDING, VERIFIED, FAILED
- `CommunityStatus` — ACTIVE, INACTIVE, SUSPENDED
- `SubscriptionPlan` — STARTER, PRO, ENTERPRISE
- `SessionStatus` — SCHEDULED, ACTIVE, COMPLETED, CANCELLED
- `ModerationAction` — WARN, PROMOTE, DEMOTE, TERMINATE

## Migrations

```bash
pnpm db:migrate    # create/apply migrations
pnpm db:generate   # regenerate Prisma client
pnpm db:seed       # seed demo data
```
