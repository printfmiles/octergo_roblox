import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SessionsService } from './sessions.service';

@Controller('sessions')
@UseGuards(AuthGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get('community/:communityId')
  list(@Param('communityId') communityId: string) {
    return this.sessionsService.findByCommunity(communityId);
  }

  @Post('community/:communityId')
  create(
    @Param('communityId') communityId: string,
    @Body() body: { title: string; description?: string; scheduledAt: string },
  ) {
    return this.sessionsService.create(communityId, body);
  }
}
