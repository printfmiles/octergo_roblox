import { createClient, loginClient } from './client';
import { registerInteractionHandler } from './handlers/interaction.handler';
import { registerErrorHandler } from './handlers/error.handler';

async function main() {
  const client = createClient();

  registerErrorHandler(client);
  registerInteractionHandler(client);

  client.once('ready', () => {
    console.log(`Bot logged in as ${client.user?.tag}`);
  });

  await loginClient(client);
}

main().catch((err) => {
  console.error('Bot failed to start:', err);
  process.exit(1);
});
