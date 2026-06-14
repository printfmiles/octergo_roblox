import { Injectable, Logger } from '@nestjs/common';
import { env } from '../../config/env';

@Injectable()
export class DiscordBotService {
  private readonly logger = new Logger(DiscordBotService.name);
  private readonly baseUrl = 'https://discord.com/api/v10';

  private get headers(): Record<string, string> | null {
    if (!env.discordBotToken) return null;
    return {
      Authorization: `Bot ${env.discordBotToken}`,
      'Content-Type': 'application/json',
    };
  }

  async getMemberRoles(guildId: string, discordUserId: string): Promise<string[]> {
    const hdrs = this.headers;
    if (!hdrs) return [];

    const res = await fetch(`${this.baseUrl}/guilds/${guildId}/members/${discordUserId}`, {
      headers: hdrs,
    });
    if (!res.ok) return [];

    const data = (await res.json()) as { roles: string[] };
    return data.roles ?? [];
  }

  async setMemberRoles(
    guildId: string,
    discordUserId: string,
    roleIds: string[],
  ): Promise<{ ok: boolean; reason?: string }> {
    const hdrs = this.headers;
    if (!hdrs) {
      return { ok: false, reason: 'Discord bot token not configured' };
    }

    const res = await fetch(`${this.baseUrl}/guilds/${guildId}/members/${discordUserId}`, {
      method: 'PATCH',
      headers: hdrs,
      body: JSON.stringify({ roles: roleIds }),
    });

    if (!res.ok) {
      const text = await res.text();
      this.logger.warn(`Discord role update failed for ${discordUserId}: ${res.status} ${text}`);
      return { ok: false, reason: `Discord API ${res.status}` };
    }

    return { ok: true };
  }

  async syncMemberRoles(
    guildId: string,
    discordUserId: string,
    desiredMappedRoleIds: string[],
    allMappedRoleIds: string[],
  ): Promise<{ applied: number; removed: number; ok: boolean; reason?: string }> {
    const current = await this.getMemberRoles(guildId, discordUserId);
    const mappedSet = new Set(allMappedRoleIds);
    const desiredSet = new Set(desiredMappedRoleIds);

    const kept = current.filter((r) => !mappedSet.has(r));
    const nextRoles = [...kept, ...desiredMappedRoleIds.filter((id) => desiredSet.has(id))];
    const uniqueRoles = [...new Set(nextRoles)];

    const removed = current.filter((r) => mappedSet.has(r) && !desiredSet.has(r)).length;
    const applied = desiredMappedRoleIds.filter((r) => !current.includes(r)).length;

    const result = await this.setMemberRoles(guildId, discordUserId, uniqueRoles);
    return { applied, removed, ok: result.ok, reason: result.reason };
  }
}
