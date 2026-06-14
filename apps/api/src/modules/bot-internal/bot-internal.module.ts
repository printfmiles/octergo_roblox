import { Module } from '@nestjs/common';
import { RolesModule } from '../roles/roles.module';
import { VerificationModule } from '../verification/verification.module';
import { BotInternalController } from './bot-internal.controller';
import { BotInternalService } from './bot-internal.service';

@Module({
  imports: [VerificationModule, RolesModule],
  controllers: [BotInternalController],
  providers: [BotInternalService],
})
export class BotInternalModule {}
