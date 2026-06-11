import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const helpCommandData = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Show available Octergo bot commands');

export async function helpCommand(interaction: ChatInputCommandInteraction) {
  await interaction.reply({
    ephemeral: true,
    content: [
      '**Octergo Bot Commands**',
      '`/verify` — Link your Roblox account',
      '`/sync_roles` — Sync Discord roles from Roblox rank',
      '`/session_announce` — Announce a scheduled session',
      '`/help` — Show this message',
    ].join('\n'),
  });
}
