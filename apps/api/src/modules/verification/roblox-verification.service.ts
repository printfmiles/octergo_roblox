import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import { PrismaService } from '@octergo/database';
import { RobloxApiService } from '../roblox/roblox-api.service';

const VERIFICATION_TTL_MS = 30 * 60 * 1000;

function generateVerificationCode(): string {
  const suffix = randomBytes(3).toString('hex').toUpperCase();
  return `OCT-${suffix}`;
}

@Injectable()
export class RobloxVerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly robloxApi: RobloxApiService,
  ) {}

  async start(userId: string, robloxUsername: string) {
    const trimmed = robloxUsername.trim();
    if (!trimmed) {
      throw new BadRequestException('Roblox username is required');
    }

    const robloxUser = await this.robloxApi.getUserByUsername(trimmed);
    if (!robloxUser) {
      throw new NotFoundException('Roblox user not found');
    }

    const robloxUserId = String(robloxUser.id);
    const existingUser = await this.prisma.user.findFirst({
      where: {
        robloxUserId,
        robloxVerified: true,
        id: { not: userId },
      },
    });
    if (existingUser) {
      throw new ConflictException('This Roblox account is already linked to another user');
    }

    await this.prisma.robloxVerification.deleteMany({
      where: { userId, verified: false },
    });

    const verification = await this.prisma.robloxVerification.create({
      data: {
        userId,
        robloxUserId,
        robloxUsername: robloxUser.name,
        code: generateVerificationCode(),
        expiresAt: new Date(Date.now() + VERIFICATION_TTL_MS),
      },
    });

    return {
      verificationId: verification.id,
      code: verification.code,
      robloxUsername: verification.robloxUsername,
      robloxUserId: verification.robloxUserId,
      expiresAt: verification.expiresAt.toISOString(),
    };
  }

  async check(userId: string, verificationId: string) {
    const verification = await this.prisma.robloxVerification.findFirst({
      where: { id: verificationId, userId },
    });

    if (!verification) {
      throw new NotFoundException('Verification not found');
    }
    if (verification.verified) {
      throw new BadRequestException('Verification already completed');
    }
    if (verification.expiresAt < new Date()) {
      throw new BadRequestException('Verification code expired. Please start again.');
    }

    const profile = await this.robloxApi.getUserById(verification.robloxUserId);
    if (!profile) {
      throw new NotFoundException('Roblox user not found');
    }

    const description = profile.description ?? '';
    if (!description.includes(verification.code)) {
      throw new BadRequestException(
        'Code not found in Roblox bio. Add the code to your profile and try again.',
      );
    }

    const [, user] = await this.prisma.$transaction([
      this.prisma.robloxVerification.update({
        where: { id: verification.id },
        data: { verified: true },
      }),
      this.prisma.user.update({
        where: { id: userId },
        data: {
          robloxUserId: verification.robloxUserId,
          robloxUsername: verification.robloxUsername,
          robloxVerified: true,
        },
        select: {
          id: true,
          robloxUserId: true,
          robloxUsername: true,
          robloxVerified: true,
        },
      }),
    ]);

    return user;
  }
}
