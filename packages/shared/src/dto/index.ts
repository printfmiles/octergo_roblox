export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  username: string;
}

export interface RobloxVerificationDto {
  robloxUsername: string;
}

export interface DiscordVerificationDto {
  discordUserId: string;
}
