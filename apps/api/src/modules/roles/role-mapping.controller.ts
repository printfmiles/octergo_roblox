import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CommunityOwnerGuard } from '../../common/guards/community-owner.guard';
import { RoleSyncService } from './role-sync.service';

@Controller('roles')
@UseGuards(AuthGuard)
export class RoleMappingController {
  constructor(private readonly roleSyncService: RoleSyncService) {}

  @Get('community/:communityId')
  @UseGuards(CommunityOwnerGuard)
  list(@Param('communityId') communityId: string) {
    return this.roleSyncService.getMappings(communityId);
  }

  @Post('community/:communityId/sync')
  @UseGuards(CommunityOwnerGuard)
  sync(
    @Param('communityId') communityId: string,
    @Req() req: { user: { sub: string } },
  ) {
    return this.roleSyncService.syncCommunity(communityId, { executorId: req.user.sub });
  }

  @Post('community/:communityId/mapping')
  @UseGuards(CommunityOwnerGuard)
  createMapping(
    @Param('communityId') communityId: string,
    @Body() body: { robloxRankId: number; robloxRankName: string; discordRoleId: string; enabled?: boolean },
  ) {
    return this.roleSyncService.upsertMapping(communityId, body);
  }

  @Patch('community/:communityId/mapping/:robloxRankId')
  @UseGuards(CommunityOwnerGuard)
  toggleMapping(
    @Param('communityId') communityId: string,
    @Param('robloxRankId') robloxRankId: string,
    @Body() body: { enabled: boolean },
  ) {
    return this.roleSyncService.toggleMapping(communityId, Number(robloxRankId), body.enabled);
  }
}
