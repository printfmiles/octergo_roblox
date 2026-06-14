import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CommunityOwnerGuard } from '../../common/guards/community-owner.guard';
import { AuditLogsService } from './audit-logs.service';

@Controller('audit-logs')
@UseGuards(AuthGuard)
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Get('community/:communityId')
  @UseGuards(CommunityOwnerGuard)
  list(@Param('communityId') communityId: string) {
    return this.auditLogsService.findByCommunity(communityId);
  }
}
