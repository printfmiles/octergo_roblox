import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { DiscordVerificationService } from './discord-verification.service';
import { RobloxVerificationService } from './roblox-verification.service';
import { VerificationController } from './verification.controller';

@Module({
  controllers: [VerificationController],
  providers: [RobloxVerificationService, DiscordVerificationService, PrismaService],
  exports: [RobloxVerificationService, DiscordVerificationService],
})
export class VerificationModule {}
