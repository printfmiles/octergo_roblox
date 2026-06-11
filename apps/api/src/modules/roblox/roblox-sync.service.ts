import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { RobloxApiService } from './roblox-api.service';

@Injectable()
export class RobloxSyncService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly robloxApi: RobloxApiService,
  ) {}

  async syncCommunityMembers(communityId: string) {
    const community = await this.prisma.community.findUniqueOrThrow({
      where: { id: communityId },
    });
    const { members } = await this.robloxApi.getGroupMembers(community.robloxGroupId);
    return { communityId, synced: members.length };
  }
}
