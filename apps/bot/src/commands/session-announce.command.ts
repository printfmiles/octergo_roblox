import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { backendApi } from '../services/backend-api.service';

export const sessionAnnounceCommandData = new SlashCommandBuilder()
  .setName('session_announce')
  .setDescription('Announce a scheduled session')
  .addStringOption((opt) =>
    opt.setName('session_id').setDescription('Session ID').setRequired(true),
  );

export async function sessionAnnounceCommand(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const sessionId = interaction.options.getString('session_id', true);

  await backendApi.post('/session-announce', { sessionId });

  await interaction.editReply('Session announced successfully.');
}
