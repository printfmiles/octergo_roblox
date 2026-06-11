import { Injectable } from '@nestjs/common';
import { ModerationAction, PrismaService } from '@octergo/database';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  findByCommunity(communityId: string) {
    return this.prisma.auditLog.findMany({
      where: { communityId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  create(data: {
    communityId: string;
    executorId?: string;
    action: ModerationAction;
    targetUsername: string;
    targetRobloxId?: string;
    detail: string;
  }) {
    return this.prisma.auditLog.create({ data });
  }
}
