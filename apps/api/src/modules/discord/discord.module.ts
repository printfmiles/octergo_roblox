import { Module } from '@nestjs/common';
import { DiscordBotService } from './discord-bot.service';
import { DiscordConfigService } from './discord-config.service';
import { DiscordSyncService } from './discord-sync.service';

@Module({
  providers: [DiscordConfigService, DiscordSyncService, DiscordBotService],
  exports: [DiscordConfigService, DiscordSyncService, DiscordBotService],
})
export class DiscordModule {}
