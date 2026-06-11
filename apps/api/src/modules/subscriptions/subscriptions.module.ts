import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  providers: [SubscriptionsService, PrismaService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
