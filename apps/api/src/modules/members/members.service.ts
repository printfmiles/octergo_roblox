import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  findByCommunity(communityId: string) {
    return this.prisma.member.findMany({ where: { communityId } });
  }
}
