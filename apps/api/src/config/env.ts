import { optionalEnv, requireEnv } from '@octergo/config';

export const env = {
  nodeEnv: optionalEnv('NODE_ENV', 'development'),
  appUrl: optionalEnv('APP_URL', 'http://localhost:5173'),
  apiUrl: optionalEnv('API_URL', 'http://localhost:3000'),
  databaseUrl: requireEnv('DATABASE_URL'),
  jwtAccessSecret: requireEnv('JWT_ACCESS_SECRET'),
  jwtRefreshSecret: requireEnv('JWT_REFRESH_SECRET'),
  botInternalSecret: requireEnv('BOT_INTERNAL_SECRET'),
  discordBotToken: optionalEnv('DISCORD_BOT_TOKEN'),
  discordGuildId: optionalEnv('DISCORD_GUILD_ID'),
  robloxOpenCloudApiKey: optionalEnv('ROBLOX_OPEN_CLOUD_API_KEY'),
};
