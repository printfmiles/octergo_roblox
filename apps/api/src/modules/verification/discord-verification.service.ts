import { BadRequestException, Injectable } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '@octergo/database';

const VERIFICATION_TTL_MS = 15 * 60 * 1000;

function generateVerificationCode(): string {
  const suffix = randomBytes(3).toString('hex').toUpperCase();
  return `OCT-${suffix}`;
}

export interface DiscordVerifyByCodeInput {
  code: string;
  discordUserId: string;
  discordUsername: string;
  guildId?: string;
}

@Injectable()
export class DiscordVerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async start(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    if (user.discordVerified) {
      throw new BadRequestException('Discord account is already verified');
    }

    await this.prisma.discordVerification.deleteMany({
      where: { userId, verified: false },
    });

    const verification = await this.prisma.discordVerification.create({
      data: {
        userId,
        code: generateVerificationCode(),
        expiresAt: new Date(Date.now() + VERIFICATION_TTL_MS),
      },
    });

    return {
      code: verification.code,
      expiresAt: verification.expiresAt.toISOString(),
      expiresInMinutes: 15,
    };
  }

  async getStatus(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        discordVerified: true,
        discordUserId: true,
        discordUsername: true,
      },
    });

    if (user.discordVerified) {
      return {
        status: 'verified' as const,
        discordUserId: user.discordUserId,
        discordUsername: user.discordUsername,
      };
    }

    const pending = await this.prisma.discordVerification.findFirst({
      where: { userId, verified: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!pending) {
      return { status: 'none' as const };
    }

    if (pending.expiresAt < new Date()) {
      return { status: 'expired' as const, code: pending.code };
    }

    return {
      status: 'pending' as const,
      code: pending.code,
      expiresAt: pending.expiresAt.toISOString(),
    };
  }

  async verifyByCode(input: DiscordVerifyByCodeInput) {
    const code = input.code.trim().toUpperCase();
    if (!code) {
      return { verified: false, message: 'Invalid or expired code. Please generate a new code from the Octergo dashboard.' };
    }

    const verification = await this.prisma.discordVerification.findUnique({
      where: { code },
      include: { user: true },
    });

    if (!verification || verification.verified) {
      return { verified: false, message: 'Invalid or expired code. Please generate a new code from the Octergo dashboard.' };
    }

    if (verification.expiresAt < new Date()) {
      return { verified: false, message: 'Invalid or expired code. Please generate a new code from the Octergo dashboard.' };
    }

    const existingDiscordUser = await this.prisma.user.findFirst({
      where: {
        discordUserId: input.discordUserId,
        id: { not: verification.userId },
      },
    });
    if (existingDiscordUser) {
      return {
        verified: false,
        message: 'This Discord account is already linked to another Octergo user.',
      };
    }

    await this.prisma.$transaction([
      this.prisma.discordVerification.update({
        where: { id: verification.id },
        data: {
          verified: true,
          discordUserId: input.discordUserId,
          discordUsername: input.discordUsername,
          guildId: input.guildId ?? null,
        },
      }),
      this.prisma.user.update({
        where: { id: verification.userId },
        data: {
          discordUserId: input.discordUserId,
          discordUsername: input.discordUsername,
          discordVerified: true,
        },
      }),
    ]);

    return {
      verified: true,
      discordUserId: input.discordUserId,
      discordUsername: input.discordUsername,
      message: 'Verified! Your Discord account is now linked to Octergo.',
    };
  }

  /** @deprecated Use verifyByCode via bot slash command instead */
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
