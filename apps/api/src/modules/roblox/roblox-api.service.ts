import { Injectable } from '@nestjs/common';
import { env } from '../../config/env';

@Injectable()
export class RobloxApiService {
  private readonly apiKey = env.robloxOpenCloudApiKey;

  async getGroupMembers(groupId: string) {
    // TODO: integrate Roblox Open Cloud / Groups API
    return { groupId, members: [] };
  }

  async getUserByUsername(username: string) {
    const res = await fetch(
      `https://users.roblox.com/v1/usernames/users`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usernames: [username], excludeBannedUsers: true }),
      },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { data?: Array<{ id: number; name: string }> };
    return data.data?.[0] ?? null;
  }
}
