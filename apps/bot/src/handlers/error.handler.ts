import { Client } from 'discord.js';

export function registerErrorHandler(client: Client) {
  client.on('error', (err) => console.error('Discord client error:', err));
  process.on('unhandledRejection', (err) => console.error('Unhandled rejection:', err));
}
