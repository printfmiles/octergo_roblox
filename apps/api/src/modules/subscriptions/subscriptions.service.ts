import { Injectable } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { PLAN_LIMITS, SubscriptionPlan } from '@octergo/shared';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getLimits(userId: string) {
    const subscription = await this.prisma.subscription.findUnique({ where: { userId } });
    const plan = (subscription?.plan ?? SubscriptionPlan.STARTER) as SubscriptionPlan;
    return PLAN_LIMITS[plan];
  }
}
