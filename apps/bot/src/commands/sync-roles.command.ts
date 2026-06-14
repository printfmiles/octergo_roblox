import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { backendApi } from '../services/backend-api.service';

interface RoleSyncResult {
  membersSynced: number;
  usersProcessed: number;
  rolesApplied: number;
  rolesRemoved: number;
  failed: Array<{ discordUserId: string; robloxUsername: string; reason: string }>;
}

export const syncRolesCommandData = new SlashCommandBuilder()
  .setName('sync_roles')
  .setDescription('Sync your Discord roles based on your Roblox rank')
  .addStringOption((opt) =>
    opt.setName('community_id').setDescription('Community ID').setRequired(true),
  );

export async function syncRolesCommand(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const communityId = interaction.options.getString('community_id', true);

  const result = await backendApi.post<RoleSyncResult>('/sync-roles', {
    communityId,
    discordUserId: interaction.user.id,
  });

  const failedNote =
    result.failed.length > 0
      ? `\n⚠️ ${result.failed.length} failed: ${result.failed.map((f) => f.reason).join(', ')}`
      : '';

  await interaction.editReply(
    `✅ Synced roles for your account.\n` +
      `Members refreshed: ${result.membersSynced}\n` +
      `Roles applied: ${result.rolesApplied}, removed: ${result.rolesRemoved}${failedNote}`,
  );
}
