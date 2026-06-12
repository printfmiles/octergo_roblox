import { IsString, MinLength } from 'class-validator';

export class StartRobloxVerificationDto {
  @IsString()
  @MinLength(1)
  robloxUsername: string;
}
