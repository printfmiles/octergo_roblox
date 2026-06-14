import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  robloxGroupId: string;

  @IsOptional()
  @IsString()
  discordGuildId?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
