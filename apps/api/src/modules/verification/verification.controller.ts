import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { DiscordVerificationService } from './discord-verification.service';
import { RobloxVerificationService } from './roblox-verification.service';

@Controller('verification')
@UseGuards(AuthGuard)
export class VerificationController {
  constructor(
    private readonly robloxVerification: RobloxVerificationService,
    private readonly discordVerification: DiscordVerificationService,
  ) {}

  @Post('roblox')
  verifyRoblox(
    @Req() req: { user: { sub: string } },
    @Body() body: { robloxUsername: string },
  ) {
    return this.robloxVerification.verify(req.user.sub, body.robloxUsername);
  }

  @Post('discord')
  verifyDiscord(
    @Req() req: { user: { sub: string } },
    @Body() body: { discordUserId: string },
  ) {
    return this.discordVerification.verify(req.user.sub, body.discordUserId);
  }
}
