import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { RobloxApiService } from '../roblox/roblox-api.service';
import { RoleSyncService } from '../roles/role-sync.service';

@Injectable()
export class BotInternalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly robloxApi: RobloxApiService,
    private readonly roleSyncService: RoleSyncService,
  ) {}

  async handleVerify(body: { discordUserId: string; robloxUsername: string }) {
    const { discordUserId, robloxUsername } = body;

    const robloxUser = await this.robloxApi.getUserByUsername(robloxUsername);
    if (!robloxUser) {
      return { verified: false, discordUserId, robloxUsername, message: 'Roblox user not found' };
    }

    const existingDiscordUser = await this.prisma.user.findFirst({
      where: { discordUserId },
    });
    if (existingDiscordUser && existingDiscordUser.robloxUsername !== robloxUsername) {
      return {
        verified: false,
        discordUserId,
        robloxUsername,
        message: 'This Discord account is already linked to a different Roblox account',
      };
    }

    const user = await this.prisma.user.findFirst({
      where: { robloxUsername },
    });

    if (!user) {
      return {
        verified: false,
        discordUserId,
        robloxUsername,
        message: 'No Octergo account found for this Roblox username. Register at the dashboard first.',
      };
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        discordUserId,
        discordVerified: true,
        robloxUserId: String(robloxUser.id),
        robloxUsername: robloxUser.name,
        robloxVerified: true,
      },
    });

    return { verified: true, discordUserId, robloxUsername };
  }

  async handleSyncRoles(body: { communityId: string; discordUserId: string }) {
    return this.roleSyncService.syncCommunity(body.communityId);
  }

  async handleSessionAnnounce(body: { sessionId: string }) {
    return { announced: true, sessionId: body.sessionId };
  }
}
