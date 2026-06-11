import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  findByCommunity(communityId: string) {
    return this.prisma.session.findMany({
      where: { communityId },
      orderBy: { scheduledAt: 'asc' },
    });
  }

  create(communityId: string, data: { title: string; description?: string; scheduledAt: string }) {
    return this.prisma.session.create({
      data: {
        communityId,
        title: data.title,
        description: data.description,
        scheduledAt: new Date(data.scheduledAt),
      },
    });
  }
}
