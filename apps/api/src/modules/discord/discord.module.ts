import { Module } from '@nestjs/common';
import { DiscordConfigService } from './discord-config.service';
import { DiscordSyncService } from './discord-sync.service';

@Module({
  providers: [DiscordConfigService, DiscordSyncService],
  exports: [DiscordConfigService, DiscordSyncService],
})
export class DiscordModule {}
