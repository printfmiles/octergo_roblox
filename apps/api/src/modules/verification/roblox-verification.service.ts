import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';

@Injectable()
export class RobloxVerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async verify(userId: string, robloxUsername: string) {
    // TODO: validate via Roblox API
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        robloxUsername,
        robloxVerified: true,
      },
      select: { id: true, robloxUsername: true, robloxVerified: true },
    });
  }
}
