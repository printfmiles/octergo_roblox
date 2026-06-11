# Discord Bot Setup

## 1. Create a Discord application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Copy **Application ID** → `DISCORD_CLIENT_ID`
4. Under Bot, create a bot and copy the token → `DISCORD_BOT_TOKEN`

## 2. Invite the bot

Required permissions:
- Manage Roles
- Send Messages
- Use Slash Commands

## 3. Configure environment

```env
DISCORD_CLIENT_ID=your_client_id
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_GUILD_ID=your_guild_id
BOT_INTERNAL_SECRET=shared_secret_with_api
```

## 4. Register slash commands

```bash
pnpm bot:deploy-commands
```

## 5. Start the bot

```bash
pnpm dev:bot
```

## Commands

| Command | Description |
|---------|-------------|
| `/verify` | Link Roblox account |
| `/sync_roles` | Sync Discord roles from Roblox rank |
| `/session_announce` | Announce a session |
| `/help` | Show help |
