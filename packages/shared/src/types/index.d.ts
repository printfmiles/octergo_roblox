import type { CommunityStatus, ModerationAction, SessionStatus, SubscriptionPlan, VerificationStatus } from '../enums';
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
    robloxRankId: number;
    robloxRankName: string;
    discordRoleId: string;
}
export interface UserProfile {
    id: string;
    email: string;
    robloxUserId?: string;
    robloxUsername?: string;
    discordUserId?: string;
    robloxVerified: boolean;
    discordVerified: boolean;
}
export interface CommunitySummary {
    id: string;
    name: string;
    robloxGroupId: string;
    discordGuildId: string;
    status: CommunityStatus;
    subscriptionPlan: SubscriptionPlan;
}
export interface MemberSummary {
    id: string;
    robloxUserId: string;
    robloxUsername: string;
    rankName: string;
    warnings: number;
    verificationStatus: VerificationStatus;
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
//# sourceMappingURL=index.d.ts.map