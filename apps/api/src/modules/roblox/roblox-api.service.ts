import { Injectable } from '@nestjs/common';

export interface RobloxGroupInfo {
  id: number;
  name: string;
  description: string;
  owner: { userId: number; username: string };
}

export interface RobloxGroupRole {
  id: number;
  name: string;
  rank: number;
}

export interface RobloxGroupMember {
  robloxUserId: string;
  robloxUsername: string;
  rankId: number;
  rankName: string;
  rank: number;
  joinedAt: string | null;
}

const HIGH_RANK_THRESHOLD = 150;

@Injectable()
export class RobloxApiService {
  async getGroup(groupId: string): Promise<RobloxGroupInfo | null> {
    const res = await fetch(`https://groups.roblox.com/v1/groups/${groupId}`);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      id: number;
      name: string;
      description: string;
      owner: { userId: number; username: string };
    };
    return {
      id: data.id,
      name: data.name,
      description: data.description ?? '',
      owner: data.owner,
    };
  }

  async getGroupRoles(groupId: string): Promise<RobloxGroupRole[]> {
    const res = await fetch(`https://groups.roblox.com/v1/groups/${groupId}/roles`);
    if (!res.ok) return [];
    const data = (await res.json()) as { roles: RobloxGroupRole[] };
    return data.roles ?? [];
  }

  async getUserGroupRole(userId: string, groupId: string): Promise<RobloxGroupRole | null> {
    let cursor: string | undefined;
    do {
      const url = new URL(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
      url.searchParams.set('limit', '100');
      url.searchParams.set('sortOrder', 'Asc');
      if (cursor) url.searchParams.set('cursor', cursor);

      const res = await fetch(url);
      if (!res.ok) return null;
      const data = (await res.json()) as {
        data: Array<{ group: { id: number }; role: RobloxGroupRole }>;
        nextPageCursor: string | null;
      };

      const match = data.data.find((g) => String(g.group.id) === groupId);
      if (match) return match.role;

      cursor = data.nextPageCursor ?? undefined;
    } while (cursor);

    return null;
  }

  isGroupOwner(group: RobloxGroupInfo, robloxUserId: string): boolean {
    return String(group.owner.userId) === robloxUserId;
  }

  isHighRank(role: RobloxGroupRole): boolean {
    return role.rank >= HIGH_RANK_THRESHOLD;
  }

  async getGroupMembers(groupId: string): Promise<{ groupId: string; members: RobloxGroupMember[] }> {
    const members: RobloxGroupMember[] = [];
    let cursor: string | undefined;

    do {
      const url = new URL(`https://groups.roblox.com/v1/groups/${groupId}/users`);
      url.searchParams.set('limit', '100');
      url.searchParams.set('sortOrder', 'Asc');
      if (cursor) url.searchParams.set('cursor', cursor);

      const res = await fetch(url);
      if (!res.ok) break;

      const data = (await res.json()) as {
        data: Array<{
          user: { userId: number; username: string };
          role: { id: number; name: string; rank: number };
          created: string;
        }>;
        nextPageCursor: string | null;
      };

      for (const entry of data.data) {
        members.push({
          robloxUserId: String(entry.user.userId),
          robloxUsername: entry.user.username,
          rankId: entry.role.id,
          rankName: entry.role.name,
          rank: entry.role.rank,
          joinedAt: entry.created ?? null,
        });
      }

      cursor = data.nextPageCursor ?? undefined;
    } while (cursor);

    return { groupId, members };
  }

  async getUserByUsername(username: string) {
    const res = await fetch(`https://users.roblox.com/v1/usernames/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: true }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { data?: Array<{ id: number; name: string }> };
    return data.data?.[0] ?? null;
  }

  async getUserById(userId: string) {
    const res = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      id: number;
      name: string;
      description?: string;
    };
    return data;
  }
}
