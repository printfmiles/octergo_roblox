import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';

@Injectable()
export class DiscordVerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async verify(userId: string, discordUserId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        discordUserId,
        discordVerified: true,
      },
      select: { id: true, discordUserId: true, discordVerified: true },
    });
  }
}
