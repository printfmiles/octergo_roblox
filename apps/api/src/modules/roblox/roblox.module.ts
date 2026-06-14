import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { RobloxApiService } from './roblox-api.service';
import { RobloxSyncService } from './roblox-sync.service';

@Module({
  imports: [AuditLogsModule],
  providers: [RobloxApiService, RobloxSyncService, PrismaService],
  exports: [RobloxApiService, RobloxSyncService],
})
export class RobloxModule {}
