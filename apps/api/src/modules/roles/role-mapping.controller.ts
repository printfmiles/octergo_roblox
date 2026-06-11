import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RoleSyncService } from './role-sync.service';

@Controller('roles')
@UseGuards(AuthGuard)
export class RoleMappingController {
  constructor(private readonly roleSyncService: RoleSyncService) {}

  @Get('community/:communityId')
  list(@Param('communityId') communityId: string) {
    return this.roleSyncService.getMappings(communityId);
  }

  @Post('community/:communityId/sync')
  sync(@Param('communityId') communityId: string) {
    return this.roleSyncService.syncCommunity(communityId);
  }

  @Post('community/:communityId/mapping')
  createMapping(
    @Param('communityId') communityId: string,
    @Body() body: { robloxRankId: number; robloxRankName: string; discordRoleId: string },
  ) {
    return this.roleSyncService.upsertMapping(communityId, body);
  }
}
