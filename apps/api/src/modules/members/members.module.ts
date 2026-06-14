import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { CommunityOwnerGuard } from '../../common/guards/community-owner.guard';
import { RobloxModule } from '../roblox/roblox.module';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Module({
  imports: [RobloxModule],
  controllers: [MembersController],
  providers: [MembersService, PrismaService, CommunityOwnerGuard],
  exports: [MembersService],
})
export class MembersModule {}
