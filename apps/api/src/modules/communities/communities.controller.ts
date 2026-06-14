import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CommunityOwnerGuard } from '../../common/guards/community-owner.guard';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunitySettingsDto } from './dto/update-community-settings.dto';

@Controller('communities')
@UseGuards(AuthGuard)
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  list(@Req() req: { user: { sub: string } }) {
    return this.communitiesService.findByOwner(req.user.sub);
  }

  @Get(':id')
  getOne(@Req() req: { user: { sub: string } }, @Param('id') id: string) {
    return this.communitiesService.findById(id, req.user.sub);
  }

  @Post()
  create(@Req() req: { user: { sub: string } }, @Body() body: CreateCommunityDto) {
    return this.communitiesService.create(req.user.sub, body);
  }

  @Post(':id/verify')
  @UseGuards(CommunityOwnerGuard)
  verify(@Param('id') id: string, @Req() req: { user: { sub: string } }) {
    return this.communitiesService.verifyOwnership(req.user.sub, id);
  }

  @Post(':id/request-approval')
  @UseGuards(CommunityOwnerGuard)
  requestApproval(@Param('id') id: string, @Req() req: { user: { sub: string } }) {
    return this.communitiesService.requestManualApproval(req.user.sub, id);
  }

  @Post(':id/approve')
  approve(@Req() req: { user: { sub: string } }, @Param('id') id: string) {
    return this.communitiesService.approveCommunity(req.user.sub, id);
  }

  @Patch(':id/settings')
  @UseGuards(CommunityOwnerGuard)
  updateSettings(
    @Req() req: { user: { sub: string } },
    @Param('id') id: string,
    @Body() body: UpdateCommunitySettingsDto,
  ) {
    return this.communitiesService.updateSettings(req.user.sub, id, body);
  }
}
