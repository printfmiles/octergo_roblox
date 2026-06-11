import { Module } from '@nestjs/common';
import { PrismaService } from '@octergo/database';
import { RoleMappingController } from './role-mapping.controller';
import { RoleSyncService } from './role-sync.service';

@Module({
  controllers: [RoleMappingController],
  providers: [RoleSyncService, PrismaService],
  exports: [RoleSyncService],
})
export class RolesModule {}
