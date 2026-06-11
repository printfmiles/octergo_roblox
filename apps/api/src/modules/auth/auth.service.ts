import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@octergo/database';
import { env } from '../../config/env';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private jwt = new JwtService({
    secret: env.jwtAccessSecret,
    signOptions: { expiresIn: '15m' },
  });

  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        passwordHash,
        subscription: { create: {} },
      },
    });
    return this.issueTokens(user.id);
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
        robloxVerified: true,
        discordVerified: true,
      },
    });
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
