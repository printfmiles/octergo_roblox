import { IsOptional, IsString } from 'class-validator';

export class UpdateCommunitySettingsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  discordWebhookUrl?: string;

  @IsOptional()
  @IsString()
  discordLogChannelId?: string;
}
