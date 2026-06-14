import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import type { CommunityCreateResponse, CommunitySummary } from '@octergo/shared';
import { CommunityStatus, CommunityVerificationStatus } from '@octergo/shared';
import { randomBytes } from 'node:crypto';
import { env } from '../../config/env';
import { RobloxApiService } from '../roblox/roblox-api.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

function generateCommunityCode(): string {
  return `OCT-${randomBytes(3).toString('hex').toUpperCase()}`;
}

@Injectable()
export class CommunitiesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly robloxApi: RobloxApiService,
    private readonly subscriptions: SubscriptionsService,
  ) {}

  findByOwner(ownerId: string) {
    return this.prisma.community.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string, ownerId: string) {
    return this.prisma.community.findFirst({
      where: { id, ownerId },
    });
  }

  async create(
    ownerId: string,
    data: { name: string; robloxGroupId: string; discordGuildId?: string; description?: string },
  ): Promise<CommunityCreateResponse> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: ownerId } });

    if (!user.robloxVerified || !user.robloxUserId) {
      throw new BadRequestException('Verify your Roblox account before linking a community');
    }

    const limits = await this.subscriptions.getLimits(ownerId);
    const existingCount = await this.prisma.community.count({ where: { ownerId } });
    if (existingCount >= limits.maxGroups) {
      throw new BadRequestException(`Your plan allows up to ${limits.maxGroups} communit${limits.maxGroups === 1 ? 'y' : 'ies'}`);
    }

    const group = await this.robloxApi.getGroup(data.robloxGroupId);
    if (!group) {
      throw new BadRequestException('Roblox group not found. Check the group ID.');
    }

    const discordGuildId = data.discordGuildId?.trim() || env.discordGuildId || '';
    if (!discordGuildId) {
      throw new BadRequestException('Discord guild ID is required');
    }

    const code = generateCommunityCode();
    let verificationStatus: CommunityVerificationStatus = CommunityVerificationStatus.PENDING;
    let verificationMethod: string | null = null;
    let verifiedAt: Date | null = null;
    let status: CommunityStatus = CommunityStatus.INACTIVE;
    let verificationHint = `Add ${code} to your Roblox group description, then click "Verify ownership".`;

    if (this.robloxApi.isGroupOwner(group, user.robloxUserId)) {
      verificationStatus = CommunityVerificationStatus.VERIFIED;
      verificationMethod = 'owner';
      verifiedAt = new Date();
      status = CommunityStatus.ACTIVE;
      verificationHint = 'Verified automatically — you are the Roblox group owner.';
    } else {
      const role = await this.robloxApi.getUserGroupRole(user.robloxUserId, data.robloxGroupId);
      if (role && this.robloxApi.isHighRank(role)) {
        verificationStatus = CommunityVerificationStatus.VERIFIED;
        verificationMethod = 'rank';
        verifiedAt = new Date();
        status = CommunityStatus.ACTIVE;
        verificationHint = `Verified automatically — your rank "${role.name}" has sufficient permissions.`;
      }
    }

    const community = await this.prisma.community.create({
      data: {
        name: data.name.trim() || group.name,
        description: data.description?.trim() || null,
        ownerId,
        robloxGroupId: data.robloxGroupId,
        discordGuildId,
        status,
        verificationStatus,
        verificationCode: verificationStatus === CommunityVerificationStatus.VERIFIED ? null : code,
        verificationMethod,
        verifiedAt,
      },
    });

    return {
      ...this.toSummary(community),
      verificationHint,
    };
  }

  async verifyOwnership(ownerId: string, communityId: string) {
    const community = await this.prisma.community.findFirst({
      where: { id: communityId, ownerId },
    });
    if (!community) throw new NotFoundException('Community not found');

    if (community.verificationStatus === CommunityVerificationStatus.VERIFIED) {
      return { verified: true, method: community.verificationMethod, message: 'Already verified' };
    }

    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: ownerId } });
    if (!user.robloxUserId) {
      throw new BadRequestException('Roblox account not linked');
    }

    const group = await this.robloxApi.getGroup(community.robloxGroupId);
    if (!group) throw new BadRequestException('Could not fetch Roblox group');

    if (this.robloxApi.isGroupOwner(group, user.robloxUserId)) {
      return this.markVerified(communityId, 'owner', 'Verified as Roblox group owner');
    }

    const role = await this.robloxApi.getUserGroupRole(user.robloxUserId, community.robloxGroupId);
    if (role && this.robloxApi.isHighRank(role)) {
      return this.markVerified(communityId, 'rank', `Verified via rank "${role.name}"`);
    }

    if (community.verificationCode && group.description.includes(community.verificationCode)) {
      return this.markVerified(communityId, 'description', 'Verified via group description code');
    }

    return {
      verified: false,
      message: community.verificationCode
        ? `Add ${community.verificationCode} to your Roblox group description and try again, or request manual approval.`
        : 'Ownership could not be verified',
    };
  }

  async requestManualApproval(ownerId: string, communityId: string) {
    const community = await this.prisma.community.findFirst({
      where: { id: communityId, ownerId },
    });
    if (!community) throw new NotFoundException('Community not found');

    if (community.verificationStatus === CommunityVerificationStatus.VERIFIED) {
      return { status: 'VERIFIED', message: 'Community is already verified' };
    }

    await this.prisma.community.update({
      where: { id: communityId },
      data: { verificationStatus: CommunityVerificationStatus.PENDING_APPROVAL },
    });

    return {
      status: 'PENDING_APPROVAL',
      message: 'Manual approval requested. An Octergo admin will review your community.',
    };
  }

  async approveCommunity(adminUserId: string, communityId: string) {
    const admin = await this.prisma.user.findUniqueOrThrow({ where: { id: adminUserId } });
    if (admin.role !== 'ADMIN') {
      throw new ForbiddenException('Only platform admins can approve communities');
    }

    return this.markVerified(communityId, 'manual', 'Approved by Octergo admin');
  }

  async updateSettings(
    ownerId: string,
    communityId: string,
    data: { name?: string; description?: string; discordWebhookUrl?: string; discordLogChannelId?: string },
  ) {
    const community = await this.prisma.community.findFirst({
      where: { id: communityId, ownerId },
    });
    if (!community) throw new NotFoundException('Community not found');

    return this.prisma.community.update({
      where: { id: communityId },
      data: {
        name: data.name?.trim() || undefined,
        description: data.description?.trim() ?? undefined,
        discordWebhookUrl: data.discordWebhookUrl?.trim() ?? undefined,
        discordLogChannelId: data.discordLogChannelId?.trim() ?? undefined,
      },
    });
  }

  private async markVerified(communityId: string, method: string, message: string) {
    await this.prisma.community.update({
      where: { id: communityId },
      data: {
        verificationStatus: CommunityVerificationStatus.VERIFIED,
        verificationMethod: method,
        verifiedAt: new Date(),
        status: CommunityStatus.ACTIVE,
        verificationCode: null,
      },
    });

    return { verified: true, method, message };
  }

  private toSummary(community: {
    id: string;
    name: string;
    description: string | null;
    robloxGroupId: string;
    discordGuildId: string;
    status: string;
    verificationStatus: string;
    verificationCode: string | null;
    verificationMethod: string | null;
    memberCount: number;
    verifiedAt: Date | null;
  }): CommunitySummary {
    return {
      id: community.id,
      name: community.name,
      description: community.description,
      robloxGroupId: community.robloxGroupId,
      discordGuildId: community.discordGuildId,
      status: community.status as CommunitySummary['status'],
      verificationStatus: community.verificationStatus as CommunitySummary['verificationStatus'],
      verificationCode: community.verificationCode,
      verificationMethod: community.verificationMethod,
      memberCount: community.memberCount,
      verifiedAt: community.verifiedAt?.toISOString() ?? null,
    };
  }
}
