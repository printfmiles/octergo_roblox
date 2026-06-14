import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { backendApi } from '../services/backend-api.service';

export const verifyCommandData = new SlashCommandBuilder()
  .setName('verify')
  .setDescription('Link your Discord account to your Octergo account')
  .addStringOption((opt) =>
    opt
      .setName('code')
      .setDescription('Your Octergo verification code (e.g. OCT-8K2M4Q)')
      .setRequired(true),
  );

interface VerifyResult {
  verified: boolean;
  message?: string;
}

export async function verifyCommand(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply({ ephemeral: true });

  const code = interaction.options.getString('code', true).trim().toUpperCase();

  const result = await backendApi.post<VerifyResult>('/discord/verify', {
    code,
    discordUserId: interaction.user.id,
    discordUsername: interaction.user.username,
    guildId: interaction.guildId ?? undefined,
  });

  await interaction.editReply(
    result.verified
      ? `✅ ${result.message ?? 'Verified! Your Discord account is now linked to Octergo.'}`
      : `❌ ${result.message ?? 'Invalid or expired code. Please generate a new code from the Octergo dashboard.'}`,
  );
}
