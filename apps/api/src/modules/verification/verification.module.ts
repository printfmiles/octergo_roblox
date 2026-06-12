import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { RobloxModule } from '../roblox/roblox.module';
import { DiscordVerificationService } from './discord-verification.service';
import { RobloxVerificationService } from './roblox-verification.service';
import { VerificationController } from './verification.controller';

@Module({
  imports: [RobloxModule],
  controllers: [VerificationController],
  providers: [RobloxVerificationService, DiscordVerificationService, PrismaService],
  exports: [RobloxVerificationService, DiscordVerificationService],
})
export class VerificationModule {}
