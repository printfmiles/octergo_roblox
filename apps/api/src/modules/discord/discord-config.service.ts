import { Injectable } from '@nestjs/common';
import { optionalEnv } from '@octergo/config';

@Injectable()
export class DiscordConfigService {
  readonly guildId = optionalEnv('DISCORD_GUILD_ID');
  readonly verifyChannelId = optionalEnv('DISCORD_VERIFY_CHANNEL_ID');
  readonly sessionChannelId = optionalEnv('DISCORD_SESSION_CHANNEL_ID');
  readonly auditLogChannelId = optionalEnv('DISCORD_AUDIT_LOG_CHANNEL_ID');
}
