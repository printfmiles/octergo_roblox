import { optionalEnv, requireEnv } from '@octergo/config';

export const env = {
  apiUrl: optionalEnv('API_URL', 'http://localhost:3000'),
  botToken: requireEnv('DISCORD_BOT_TOKEN'),
  botInternalSecret: requireEnv('BOT_INTERNAL_SECRET'),
  guildId: optionalEnv('DISCORD_GUILD_ID'),
};
