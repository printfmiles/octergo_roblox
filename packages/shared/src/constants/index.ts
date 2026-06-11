import { SubscriptionPlan } from '../enums/index.ts';

export const PLAN_LIMITS = {
  [SubscriptionPlan.STARTER]: {
    name: 'Starter',
    price: 4.99,
    maxGroups: 1,
    maxLogsPerMonth: 100,
    actions: ['warn'] as const,
  },
  [SubscriptionPlan.PRO]: {
    name: 'Pro',
    price: 12.99,
    maxGroups: 3,
    maxLogsPerMonth: 1000,
    actions: ['warn', 'promote', 'demote'] as const,
  },
  [SubscriptionPlan.ENTERPRISE]: {
    name: 'Enterprise',
    price: 29.99,
    maxGroups: 10,
    maxLogsPerMonth: -1,
    actions: ['warn', 'promote', 'demote', 'terminate'] as const,
  },
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  VERIFICATION: {
    ROBLOX: '/verification/roblox',
    DISCORD: '/verification/discord',
  },
  COMMUNITIES: '/communities',
  MEMBERS: '/members',
  ROLES: '/roles',
  SESSIONS: '/sessions',
  AUDIT_LOGS: '/audit-logs',
  BOT_INTERNAL: '/bot-internal',
} as const;
