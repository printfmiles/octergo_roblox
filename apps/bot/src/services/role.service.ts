import { GuildMember } from 'discord.js';

export class RoleService {
  async applyRoles(member: GuildMember, roleIds: string[]) {
    const roles = roleIds.filter((id) => member.guild.roles.cache.has(id));
    if (roles.length > 0) {
      await member.roles.add(roles);
    }
    return { applied: roles.length };
  }
}

export const roleService = new RoleService();
