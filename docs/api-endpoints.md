# API Endpoints

Base URL: `http://localhost:3000`

## Auth

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | — | Create account |
| POST | `/auth/login` | — | Login |
| GET | `/auth/me` | JWT | Current user |

## Verification

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/verification/roblox` | JWT | Verify Roblox username |
| POST | `/verification/discord` | JWT | Link Discord account |

## Communities

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/communities` | JWT | List user's communities |
| POST | `/communities` | JWT | Create community link |

## Members

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/members/community/:id` | JWT | List community members |

## Roles

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/roles/community/:id` | JWT | List role mappings |
| POST | `/roles/community/:id/mapping` | JWT | Create/update mapping |
| POST | `/roles/community/:id/sync` | JWT | Trigger role sync |

## Sessions

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/sessions/community/:id` | JWT | List sessions |
| POST | `/sessions/community/:id` | JWT | Create session |

## Audit logs

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/audit-logs/community/:id` | JWT | List audit logs |

## Bot internal (x-bot-secret header)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/bot-internal/verify` | Handle /verify command |
| POST | `/bot-internal/sync-roles` | Handle /sync_roles command |
| POST | `/bot-internal/session-announce` | Handle /session_announce command |
