import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { CommunityOwnerGuard } from '../../common/guards/community-owner.guard';
import { RobloxModule } from '../roblox/roblox.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';

@Module({
  imports: [RobloxModule, SubscriptionsModule],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, PrismaService, CommunityOwnerGuard],
  exports: [CommunitiesService],
})
export class CommunitiesModule {}
