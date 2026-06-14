import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { RobloxSyncService } from '../roblox/roblox-sync.service';

@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly robloxSync: RobloxSyncService,
  ) {}

  findByCommunity(communityId: string) {
    return this.prisma.member.findMany({
      where: { communityId, isActive: true },
      orderBy: { rankName: 'asc' },
    });
  }

  syncCommunity(communityId: string, executorId: string) {
    return this.robloxSync.syncCommunityMembers(communityId, executorId);
  }
}
