import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordSyncService {
  async applyRoleChanges(_guildId: string, _userId: string, _roleIds: string[]) {
    // Role changes are applied by the bot worker, not directly from API
    return { success: true };
  }
}
