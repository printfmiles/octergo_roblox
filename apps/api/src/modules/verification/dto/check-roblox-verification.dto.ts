import { IsString, MinLength } from 'class-validator';

export class CheckRobloxVerificationDto {
  @IsString()
  @MinLength(1)
  verificationId: string;
}
