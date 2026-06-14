export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  FAILED = 'FAILED',
}

export enum CommunityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum CommunityVerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  REJECTED = 'REJECTED',
}

export enum SubscriptionPlan {
  STARTER = 'STARTER',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ModerationAction {
  WARN = 'WARN',
  PROMOTE = 'PROMOTE',
  DEMOTE = 'DEMOTE',
  TERMINATE = 'TERMINATE',
  SYNC = 'SYNC',
}
