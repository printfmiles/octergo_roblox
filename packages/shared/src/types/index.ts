import type {
  CommunityStatus,
  CommunityVerificationStatus,
  ModerationAction,
  SessionStatus,
  SubscriptionPlan,
  VerificationStatus,
} from '../enums';

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

export interface RoleMapping {
  id: string;
  robloxRankId: number;
  robloxRankName: string;
  discordRoleId: string;
  enabled: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  robloxUserId?: string;
  robloxUsername?: string;
  discordUserId?: string;
  discordUsername?: string;
  robloxVerified: boolean;
  discordVerified: boolean;
}

export interface CommunitySummary {
  id: string;
  name: string;
  description: string | null;
  robloxGroupId: string;
  discordGuildId: string;
  status: CommunityStatus;
  verificationStatus: CommunityVerificationStatus;
  verificationCode: string | null;
  verificationMethod: string | null;
  memberCount: number;
  verifiedAt: string | null;
}

export interface CommunityCreateResponse extends CommunitySummary {
  verificationHint: string;
}

export interface MemberSummary {
  id: string;
  robloxUserId: string;
  robloxUsername: string;
  rankId: number | null;
  rankName: string;
  warnings: number;
  verificationStatus: VerificationStatus;
  robloxJoinedAt: string | null;
  isActive: boolean;
}

export interface MemberSyncResult {
  communityId: string;
  synced: number;
  created: number;
  updated: number;
  deactivated: number;
  rankChanges: number;
}

export interface RoleSyncResult {
  communityId: string;
  membersSynced: number;
  usersProcessed: number;
  rolesApplied: number;
  rolesRemoved: number;
  failed: Array<{ discordUserId: string; robloxUsername: string; reason: string }>;
}

export interface SessionSummary {
  id: string;
  title: string;
  scheduledAt: string;
  status: SessionStatus;
}

export interface AuditLogEntry {
  id: string;
  action: ModerationAction;
  targetUsername: string;
  executorUsername: string;
  detail: string;
  createdAt: string;
}
