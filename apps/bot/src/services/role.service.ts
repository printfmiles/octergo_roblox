import { GuildMember } from 'discord.js';

export class RoleService {
  async applyRoles(member: GuildMember, roleIds: string[]) {
    const roles = roleIds.filter((id) => member.guild.roles.cache.has(id));
    if (roles.length > 0) {
      await member.roles.add(roles);
    }
    return { applied: roles.length };
  }

  async syncMemberRoles(
    member: GuildMember,
    desiredMappedRoleIds: string[],
    allMappedRoleIds: string[],
  ) {
    const mappedSet = new Set(allMappedRoleIds);
    const desiredSet = new Set(desiredMappedRoleIds);
    const current = member.roles.cache.map((r) => r.id);

    const toRemove = current.filter((r) => mappedSet.has(r) && !desiredSet.has(r));
    const toAdd = desiredMappedRoleIds.filter((r) => !current.includes(r));

    if (toRemove.length > 0) await member.roles.remove(toRemove);
    if (toAdd.length > 0) await member.roles.add(toAdd);

    return { applied: toAdd.length, removed: toRemove.length };
  }
}

export const roleService = new RoleService();
