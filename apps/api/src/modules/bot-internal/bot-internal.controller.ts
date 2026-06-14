import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BotInternalGuard } from '../../common/guards/bot-internal.guard';
import { DiscordVerificationService } from '../verification/discord-verification.service';
import { BotInternalService } from './bot-internal.service';

@Controller('bot-internal')
@UseGuards(BotInternalGuard)
export class BotInternalController {
  constructor(
    private readonly botInternalService: BotInternalService,
    private readonly discordVerification: DiscordVerificationService,
  ) {}

  @Post('discord/verify')
  verifyDiscord(
    @Body()
    body: {
      code: string;
      discordUserId: string;
      discordUsername: string;
      guildId?: string;
    },
  ) {
    return this.discordVerification.verifyByCode(body);
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
