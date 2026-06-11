import { Injectable } from '@nestjs/common';
import { RoleSyncService } from '../roles/role-sync.service';

@Injectable()
export class BotInternalService {
  constructor(private readonly roleSyncService: RoleSyncService) {}

  async handleVerify(body: { discordUserId: string; robloxUsername: string }) {
    // TODO: link discord user to platform user via verification flow
    return { verified: true, ...body };
  }

  async handleSyncRoles(body: { communityId: string; discordUserId: string }) {
    return this.roleSyncService.syncCommunity(body.communityId);
  }

  async handleSessionAnnounce(body: { sessionId: string }) {
    // TODO: return session details for bot to announce
    return { announced: true, sessionId: body.sessionId };
  }
}
