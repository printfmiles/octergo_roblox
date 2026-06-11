import { TextChannel } from 'discord.js';

export class AuditLogService {
  async logAction(channel: TextChannel, message: string) {
    await channel.send({ content: message });
  }
}

export const auditLogService = new AuditLogService();
