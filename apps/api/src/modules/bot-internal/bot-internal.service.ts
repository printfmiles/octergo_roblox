import { Injectable } from '@nestjs/common';
import { RoleSyncService } from '../roles/role-sync.service';

@Injectable()
export class BotInternalService {
  constructor(private readonly roleSyncService: RoleSyncService) {}

  async handleSyncRoles(body: { communityId: string; discordUserId: string }) {
    return this.roleSyncService.syncCommunity(body.communityId);
  }

  async handleSessionAnnounce(body: { sessionId: string }) {
    return { announced: true, sessionId: body.sessionId };
  }
}
