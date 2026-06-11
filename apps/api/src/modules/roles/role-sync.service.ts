import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';

@Injectable()
export class RoleSyncService {
  constructor(private readonly prisma: PrismaService) {}

  getMappings(communityId: string) {
    return this.prisma.roleMapping.findMany({ where: { communityId } });
  }

  upsertMapping(
    communityId: string,
    data: { robloxRankId: number; robloxRankName: string; discordRoleId: string },
  ) {
    return this.prisma.roleMapping.upsert({
      where: {
        communityId_robloxRankId: {
          communityId,
          robloxRankId: data.robloxRankId,
        },
      },
      create: { communityId, ...data },
      update: { robloxRankName: data.robloxRankName, discordRoleId: data.discordRoleId },
    });
  }

  async syncCommunity(communityId: string) {
    // TODO: fetch Roblox ranks, apply Discord role changes via bot
    const mappings = await this.getMappings(communityId);
    return { synced: mappings.length, communityId };
  }
}
