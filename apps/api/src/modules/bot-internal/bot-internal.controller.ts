import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BotInternalGuard } from '../../common/guards/bot-internal.guard';
import { BotInternalService } from './bot-internal.service';

@Controller('bot-internal')
@UseGuards(BotInternalGuard)
export class BotInternalController {
  constructor(private readonly botInternalService: BotInternalService) {}

  @Post('verify')
  verify(@Body() body: { discordUserId: string; robloxUsername: string }) {
    return this.botInternalService.handleVerify(body);
  }

  @Post('sync-roles')
  syncRoles(@Body() body: { communityId: string; discordUserId: string }) {
    return this.botInternalService.handleSyncRoles(body);
  }

  @Post('session-announce')
  sessionAnnounce(@Body() body: { sessionId: string }) {
    return this.botInternalService.handleSessionAnnounce(body);
  }
}
