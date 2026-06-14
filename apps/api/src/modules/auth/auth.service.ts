import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@octergo/database';
import { env } from '../../config/env';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  private jwt = new JwtService({
    secret: env.jwtAccessSecret,
    signOptions: { expiresIn: '15m' },
  });

  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          passwordHash,
          subscription: { create: {} },
        },
      });
      return this.issueTokens(user.id);
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code: string }).code === 'P2002'
      ) {
        throw new ConflictException('Email already registered');
      }
      throw err;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.issueTokens(user.id);
  }

  async getMe(userId: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        robloxVerified: true,
        discordVerified: true,
        discordUsername: true,
        robloxUsername: true,
        notifyDiscord: true,
        notifyEmail: true,
      },
    });
  }

  async updateMe(userId: string, dto: UpdateProfileDto) {
    const data: {
      username?: string;
      email?: string;
      notifyDiscord?: boolean;
      notifyEmail?: boolean;
    } = {};

    if (dto.username !== undefined) data.username = dto.username.trim();
    if (dto.email !== undefined) data.email = dto.email.trim().toLowerCase();
    if (dto.notifyDiscord !== undefined) data.notifyDiscord = dto.notifyDiscord;
    if (dto.notifyEmail !== undefined) data.notifyEmail = dto.notifyEmail;

    if (Object.keys(data).length === 0) {
      return this.getMe(userId);
    }

    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          robloxVerified: true,
          discordVerified: true,
          discordUsername: true,
          robloxUsername: true,
          notifyDiscord: true,
          notifyEmail: true,
        },
      });
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as { code: string }).code === 'P2002'
      ) {
        throw new ConflictException('Email already in use');
      }
      throw err;
    }
  }

  private issueTokens(userId: string) {
    const accessToken = this.jwt.sign({ sub: userId });
    const refreshToken = this.jwt.sign({ sub: userId }, {
      secret: env.jwtRefreshSecret,
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }
}
