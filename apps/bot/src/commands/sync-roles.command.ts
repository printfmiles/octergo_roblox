import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { backendApi } from '../services/backend-api.service';

export const syncRolesCommandData = new SlashCommandBuilder()
  .setName('sync_roles')
  .setDescription('Sync your Discord roles based on your Roblox rank')
  .addStringOption((opt) =>
    opt.setName('community_id').setDescription('Community ID').setRequired(true),
  );

export async function syncRolesCommand(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const communityId = interaction.options.getString('community_id', true);

  const result = await backendApi.post<{ synced: number }>('/sync-roles', {
    communityId,
    discordUserId: interaction.user.id,
  });

  await interaction.editReply(`Synced ${result.synced} role mapping(s).`);
}
