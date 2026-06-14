import { Injectable } from '@nestjs/common';
import { ModerationAction, PrismaService } from '@octergo/database';
import type { MemberSyncResult } from '@octergo/shared';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { RobloxApiService } from './roblox-api.service';

@Injectable()
export class RobloxSyncService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly robloxApi: RobloxApiService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async syncCommunityMembers(communityId: string, executorId?: string): Promise<MemberSyncResult> {
    const community = await this.prisma.community.findUniqueOrThrow({
      where: { id: communityId },
    });

    const { members: robloxMembers } = await this.robloxApi.getGroupMembers(community.robloxGroupId);
    const seenIds = new Set<string>();

    let created = 0;
    let updated = 0;
    let rankChanges = 0;

    for (const rm of robloxMembers) {
      seenIds.add(rm.robloxUserId);

      const existing = await this.prisma.member.findUnique({
        where: {
          communityId_robloxUserId: {
            communityId,
            robloxUserId: rm.robloxUserId,
          },
        },
      });

      if (!existing) {
        await this.prisma.member.create({
          data: {
            communityId,
            robloxUserId: rm.robloxUserId,
            robloxUsername: rm.robloxUsername,
            rankId: rm.rankId,
            rankName: rm.rankName,
            robloxJoinedAt: rm.joinedAt ? new Date(rm.joinedAt) : null,
            isActive: true,
          },
        });
        created++;
        continue;
      }

      const rankChanged =
        existing.isActive &&
        (existing.rankId !== rm.rankId || existing.rankName !== rm.rankName);

      await this.prisma.member.update({
        where: { id: existing.id },
        data: {
          robloxUsername: rm.robloxUsername,
          rankId: rm.rankId,
          rankName: rm.rankName,
          previousRankId: rankChanged ? existing.rankId : existing.previousRankId,
          previousRankName: rankChanged ? existing.rankName : existing.previousRankName,
          robloxJoinedAt: rm.joinedAt ? new Date(rm.joinedAt) : existing.robloxJoinedAt,
          isActive: true,
        },
      });
      updated++;

      if (rankChanged) {
        rankChanges++;
        await this.auditLogs.create({
          communityId,
          executorId,
          action: ModerationAction.SYNC,
          targetUsername: rm.robloxUsername,
          targetRobloxId: rm.robloxUserId,
          detail: `Rank changed: ${existing.rankName} → ${rm.rankName}`,
        });
      }
    }

    const deactivated = await this.prisma.member.updateMany({
      where: {
        communityId,
        robloxUserId: { notIn: [...seenIds] },
        isActive: true,
      },
      data: { isActive: false },
    });

    await this.prisma.community.update({
      where: { id: communityId },
      data: { memberCount: seenIds.size },
    });

    return {
      communityId,
      synced: robloxMembers.length,
      created,
      updated,
      deactivated: deactivated.count,
      rankChanges,
    };
  }
}
