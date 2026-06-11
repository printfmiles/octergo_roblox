import { Module } from '@nestjs/common';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { RobloxModule } from '../roblox/roblox.module';
import { RolesModule } from '../roles/roles.module';
import { VerificationModule } from '../verification/verification.module';
import { BotInternalController } from './bot-internal.controller';
import { BotInternalService } from './bot-internal.service';

@Module({
  imports: [VerificationModule, RolesModule, AuditLogsModule, RobloxModule],
  controllers: [BotInternalController],
  providers: [BotInternalService],
})
export class BotInternalModule {}
