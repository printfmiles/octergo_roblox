import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { backendApi } from '../services/backend-api.service';

export const verifyCommandData = new SlashCommandBuilder()
  .setName('verify')
  .setDescription('Link your Roblox account to your Discord account')
  .addStringOption((opt) =>
    opt.setName('roblox_username').setDescription('Your Roblox username').setRequired(true),
  );

export async function verifyCommand(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const robloxUsername = interaction.options.getString('roblox_username', true);

  const result = await backendApi.post<{ verified: boolean; message?: string }>('/verify', {
    discordUserId: interaction.user.id,
    robloxUsername,
  });

  await interaction.editReply(
    result.verified
      ? `Verified **${robloxUsername}** successfully!`
      : result.message ?? 'Verification failed. Please check your username and try again.',
  );
}
