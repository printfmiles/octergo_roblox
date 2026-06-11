import { Client, GatewayIntentBits } from 'discord.js';
import { env } from './config/env';

export function createClient() {
  return new Client({
    intents: [GatewayIntentBits.Guilds],
  });
}

export async function loginClient(client: Client) {
  await client.login(env.botToken);
}
