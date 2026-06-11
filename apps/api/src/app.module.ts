import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VerificationModule } from './modules/verification/verification.module';
import { CommunitiesModule } from './modules/communities/communities.module';
import { MembersModule } from './modules/members/members.module';
import { RolesModule } from './modules/roles/roles.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { RobloxModule } from './modules/roblox/roblox.module';
import { DiscordModule } from './modules/discord/discord.module';
import { BotInternalModule } from './modules/bot-internal/bot-internal.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    VerificationModule,
    CommunitiesModule,
    MembersModule,
    RolesModule,
    SessionsModule,
    SubscriptionsModule,
    AuditLogsModule,
    RobloxModule,
    DiscordModule,
    BotInternalModule,
  ],
})
export class AppModule {}
