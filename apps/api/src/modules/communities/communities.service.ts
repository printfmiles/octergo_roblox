import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';

@Injectable()
export class CommunitiesService {
  constructor(private readonly prisma: PrismaService) {}

  findByOwner(ownerId: string) {
    return this.prisma.community.findMany({ where: { ownerId } });
  }

  create(ownerId: string, data: { name: string; robloxGroupId: string; discordGuildId: string }) {
    return this.prisma.community.create({
      data: { ...data, ownerId },
    });
  }
}
