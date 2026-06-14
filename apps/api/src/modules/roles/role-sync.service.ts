import { Injectable } from '@nestjs/common';
import { ModerationAction, PrismaService } from '@octergo/database';
import type { RoleSyncResult } from '@octergo/shared';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { DiscordBotService } from '../discord/discord-bot.service';
import { RobloxSyncService } from '../roblox/roblox-sync.service';

@Injectable()
export class RoleSyncService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly robloxSync: RobloxSyncService,
    private readonly discordBot: DiscordBotService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  getMappings(communityId: string) {
    return this.prisma.roleMapping.findMany({
      where: { communityId },
      orderBy: { robloxRankId: 'desc' },
    });
  }

  upsertMapping(
    communityId: string,
    data: { robloxRankId: number; robloxRankName: string; discordRoleId: string; enabled?: boolean },
  ) {
    return this.prisma.roleMapping.upsert({
      where: {
        communityId_robloxRankId: {
          communityId,
          robloxRankId: data.robloxRankId,
        },
      },
      create: {
        communityId,
        robloxRankId: data.robloxRankId,
        robloxRankName: data.robloxRankName,
        discordRoleId: data.discordRoleId,
        enabled: data.enabled ?? true,
      },
      update: {
        robloxRankName: data.robloxRankName,
        discordRoleId: data.discordRoleId,
        enabled: data.enabled ?? true,
      },
    });
  }

  toggleMapping(communityId: string, robloxRankId: number, enabled: boolean) {
    return this.prisma.roleMapping.update({
      where: {
        communityId_robloxRankId: { communityId, robloxRankId },
      },
      data: { enabled },
    });
  }

  async syncCommunity(
    communityId: string,
    options?: { discordUserId?: string; executorId?: string },
  ): Promise<RoleSyncResult> {
    const community = await this.prisma.community.findUniqueOrThrow({
      where: { id: communityId },
    });

    const memberSync = await this.robloxSync.syncCommunityMembers(communityId, options?.executorId);

    const mappings = await this.prisma.roleMapping.findMany({
      where: { communityId, enabled: true },
    });
    const mappingByRankId = new Map(mappings.map((m) => [m.robloxRankId, m.discordRoleId]));
    const allMappedRoleIds = mappings.map((m) => m.discordRoleId);

    const members = await this.prisma.member.findMany({
      where: {
        communityId,
        isActive: true,
        ...(options?.discordUserId
          ? {}
          : {}),
      },
    });

    const verifiedUsers = await this.prisma.user.findMany({
      where: {
        robloxVerified: true,
        discordVerified: true,
        robloxUserId: { not: null },
        discordUserId: { not: null },
      },
      select: {
        robloxUserId: true,
        robloxUsername: true,
        discordUserId: true,
        discordUsername: true,
      },
    });

    const userByRobloxId = new Map(
      verifiedUsers
        .filter((u) => u.robloxUserId && u.discordUserId)
        .map((u) => [u.robloxUserId!, u]),
    );

    let usersProcessed = 0;
    let rolesApplied = 0;
    let rolesRemoved = 0;
    const failed: RoleSyncResult['failed'] = [];

    for (const member of members) {
      const linkedUser = userByRobloxId.get(member.robloxUserId);
      if (!linkedUser?.discordUserId) continue;

      if (options?.discordUserId && linkedUser.discordUserId !== options.discordUserId) {
        continue;
      }

      usersProcessed++;

      const desiredRoleId = member.rankId != null ? mappingByRankId.get(member.rankId) : undefined;
      const desiredRoles = desiredRoleId ? [desiredRoleId] : [];

      const result = await this.discordBot.syncMemberRoles(
        community.discordGuildId,
        linkedUser.discordUserId,
        desiredRoles,
        allMappedRoleIds,
      );

      if (!result.ok) {
        failed.push({
          discordUserId: linkedUser.discordUserId,
          robloxUsername: member.robloxUsername,
          reason: result.reason ?? 'Unknown error',
        });
        await this.prisma.member.update({
          where: { id: member.id },
          data: { verificationStatus: 'FAILED' },
        });
        continue;
      }

      rolesApplied += result.applied;
      rolesRemoved += result.removed;

      await this.prisma.member.update({
        where: { id: member.id },
        data: { verificationStatus: 'VERIFIED' },
      });

      const detail = desiredRoleId
        ? `Assigned Discord role for Roblox rank "${member.rankName}"`
        : `No mapping for rank "${member.rankName}" — removed mapped roles`;

      await this.auditLogs.create({
        communityId,
        executorId: options?.executorId,
        action: ModerationAction.SYNC,
        targetUsername: member.robloxUsername,
        targetRobloxId: member.robloxUserId,
        detail,
      });
    }

    return {
      communityId,
      membersSynced: memberSync.synced,
      usersProcessed,
      rolesApplied,
      rolesRemoved,
      failed,
    };
  }
}
