import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { CommunityOwnerGuard } from '../../common/guards/community-owner.guard';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { DiscordModule } from '../discord/discord.module';
import { RobloxModule } from '../roblox/roblox.module';
import { RoleMappingController } from './role-mapping.controller';
import { RoleSyncService } from './role-sync.service';

@Module({
  imports: [RobloxModule, DiscordModule, AuditLogsModule],
  controllers: [RoleMappingController],
  providers: [RoleSyncService, PrismaService, CommunityOwnerGuard],
  exports: [RoleSyncService],
})
export class RolesModule {}
