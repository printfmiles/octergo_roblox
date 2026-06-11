import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CommunitiesService } from './communities.service';

@Controller('communities')
@UseGuards(AuthGuard)
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Get()
  list(@Req() req: { user: { sub: string } }) {
    return this.communitiesService.findByOwner(req.user.sub);
  }

  @Post()
  create(
    @Req() req: { user: { sub: string } },
    @Body() body: { name: string; robloxGroupId: string; discordGuildId: string },
  ) {
    return this.communitiesService.create(req.user.sub, body);
  }
}
