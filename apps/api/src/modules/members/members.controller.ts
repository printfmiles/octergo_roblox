import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CommunityOwnerGuard } from '../../common/guards/community-owner.guard';
import { MembersService } from './members.service';

@Controller('members')
@UseGuards(AuthGuard)
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('community/:communityId')
  @UseGuards(CommunityOwnerGuard)
  list(@Param('communityId') communityId: string) {
    return this.membersService.findByCommunity(communityId);
  }

  @Post('community/:communityId/sync')
  @UseGuards(CommunityOwnerGuard)
  sync(
    @Param('communityId') communityId: string,
    @Req() req: { user: { sub: string } },
  ) {
    return this.membersService.syncCommunity(communityId, req.user.sub);
  }
}
