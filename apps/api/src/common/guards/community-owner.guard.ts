import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@octergo/database';

@Injectable()
export class CommunityOwnerGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.sub as string | undefined;
    const communityId = (request.params?.communityId ?? request.params?.id) as string | undefined;

    if (!userId || !communityId) {
      throw new ForbiddenException();
    }

    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
      select: { ownerId: true },
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    if (community.ownerId !== userId) {
      throw new ForbiddenException('You do not own this community');
    }

    request.communityId = communityId;
    return true;
  }
}
