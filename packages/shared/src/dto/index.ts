export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  username: string;
}

export interface StartRobloxVerificationDto {
  robloxUsername: string;
}

export interface CheckRobloxVerificationDto {
  verificationId: string;
}

export interface RobloxVerificationStartResponse {
  verificationId: string;
  code: string;
  robloxUsername: string;
  robloxUserId: string;
  expiresAt: string;
}

export interface RobloxVerificationCheckResponse {
  id: string;
  robloxUserId: string | null;
  robloxUsername: string | null;
  robloxVerified: boolean;
}

export interface DiscordVerificationDto {
  discordUserId: string;
}
