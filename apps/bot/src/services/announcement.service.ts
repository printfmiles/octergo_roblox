import { TextChannel } from 'discord.js';

export class AnnouncementService {
  async announceSession(channel: TextChannel, title: string, scheduledAt: string) {
    await channel.send({
      embeds: [
        {
          title: `Session: ${title}`,
          description: `Scheduled for ${scheduledAt}`,
          color: 0xa78bfa,
        },
      ],
    });
  }
}

export const announcementService = new AnnouncementService();
