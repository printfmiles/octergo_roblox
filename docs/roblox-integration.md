# Roblox Integration

## Verification

Users verify their Roblox account by providing their username. The API calls the Roblox Users API to resolve the user ID.

```
POST https://users.roblox.com/v1/usernames/users
```

## Group sync

Community members are synced from Roblox groups using the Open Cloud API.

Set `ROBLOX_OPEN_CLOUD_API_KEY` in your environment.

## Role sync flow

1. Admin configures role mappings in the dashboard (Roblox rank → Discord role)
2. Roblox group members are synced to the `Member` table
3. On `/sync_roles` or manual sync, the API determines the correct Discord roles
4. The bot applies role changes in the Discord guild

## Manual sync script

```bash
tsx scripts/sync-roblox-roles.ts <communityId>
```
