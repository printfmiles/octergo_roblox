import { ChatInputCommandInteraction } from 'discord.js';
import { verifyCommand } from '../commands/verify.command';
import { syncRolesCommand } from '../commands/sync-roles.command';
import { sessionAnnounceCommand } from '../commands/session-announce.command';
import { helpCommand } from '../commands/help.command';

const commands = {
  verify: verifyCommand,
  sync_roles: syncRolesCommand,
  session_announce: sessionAnnounceCommand,
  help: helpCommand,
};

export async function handleCommand(interaction: ChatInputCommandInteraction) {
  const handler = commands[interaction.commandName as keyof typeof commands];

  if (!handler) {
    await interaction.reply({ content: 'Unknown command.', ephemeral: true });
    return;
  }

  try {
    await handler(interaction);
  } catch (err) {
    console.error(`Command ${interaction.commandName} failed:`, err);
    const msg = { content: 'Something went wrong. Please try again.', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(msg);
    } else {
      await interaction.reply(msg);
    }
  }
}
