import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { RolesModule } from '../roles/roles.module';
import { VerificationModule } from '../verification/verification.module';
import { BotInternalController } from './bot-internal.controller';
import { BotInternalService } from './bot-internal.service';

@Module({
  imports: [VerificationModule, RolesModule, AuditLogsModule],
  controllers: [BotInternalController],
  providers: [BotInternalService, PrismaService],
})
export class BotInternalModule {}
