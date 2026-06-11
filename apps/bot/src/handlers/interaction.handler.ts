import { Client, Interaction } from 'discord.js';
import { handleCommand } from './command.handler';

export function registerInteractionHandler(client: Client) {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;
    await handleCommand(interaction);
  });
}
