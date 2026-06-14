import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { CommunityOwnerGuard } from '../../common/guards/community-owner.guard';
import { AuditLogsController } from './audit-logs.controller';
import { AuditLogsService } from './audit-logs.service';

@Module({
  controllers: [AuditLogsController],
  providers: [AuditLogsService, PrismaService, CommunityOwnerGuard],
  exports: [AuditLogsService],
})
export class AuditLogsModule {}
