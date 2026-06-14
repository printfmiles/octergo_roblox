import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CheckRobloxVerificationDto } from './dto/check-roblox-verification.dto';
import { StartRobloxVerificationDto } from './dto/start-roblox-verification.dto';
import { DiscordVerificationService } from './discord-verification.service';
import { RobloxVerificationService } from './roblox-verification.service';

@Controller('verification')
@UseGuards(AuthGuard)
export class VerificationController {
  constructor(
    private readonly robloxVerification: RobloxVerificationService,
    private readonly discordVerification: DiscordVerificationService,
  ) {}

  @Post('roblox/start')
  startRoblox(
    @Req() req: { user: { sub: string } },
    @Body() body: StartRobloxVerificationDto,
  ) {
    return this.robloxVerification.start(req.user.sub, body.robloxUsername);
  }

  @Post('roblox/check')
  checkRoblox(
    @Req() req: { user: { sub: string } },
    @Body() body: CheckRobloxVerificationDto,
  ) {
    return this.robloxVerification.check(req.user.sub, body.verificationId);
  }

  @Post('discord/start')
  startDiscord(@Req() req: { user: { sub: string } }) {
    return this.discordVerification.start(req.user.sub);
  }

  @Get('discord/status')
  discordStatus(@Req() req: { user: { sub: string } }) {
    return this.discordVerification.getStatus(req.user.sub);
  }
}
