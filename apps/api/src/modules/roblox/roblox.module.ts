import { Module } from '@nestjs/common';
import { RobloxApiService } from './roblox-api.service';
import { RobloxSyncService } from './roblox-sync.service';

@Module({
  providers: [RobloxApiService, RobloxSyncService],
  exports: [RobloxApiService, RobloxSyncService],
})
export class RobloxModule {}
