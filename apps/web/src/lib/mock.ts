import { theme } from '../theme';

export interface MockMember {
  id: number;
  username: string;
  rank: string;
  avatar: string;
  joined: string;
  warnings: number;
  status: 'active' | 'warned' | 'terminated';
  discord?: string;
}

export interface MockLog {
  id: number;
  action: 'promote' | 'demote' | 'warn' | 'terminate' | 'sync' | 'login';
  target: string;
  executor: string;
  detail: string;
  time: string;
  color: string;
}

export interface MockCommunity {
  id: number;
  name: string;
  members: number;
  rank: string;
  avatar: string;
  color: string;
  mine: boolean;
  description: string;
  groupId: string;
  plan: 'STARTER' | 'PRO' | 'ENTERPRISE';
}

export interface MockSession {
  id: number;
  title: string;
  host: string;
  day: string;
  time: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  notes?: string;
}

export interface MockRoleMap {
  id: number;
  robloxRank: string;
  robloxRankId: number;
  discordRole: string;
  discordRoleId: string;
  enabled: boolean;
}

export const RANKS = [
  'Junior Member',
  'Member',
  'Senior Member',
  'Officer',
  'Moderator',
  'Admin',
  'Co-Owner',
];

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MOCK_MEMBERS: MockMember[] = [
  { id: 1, username: 'CoolGamer123', rank: 'Member', avatar: 'CG', joined: '2024-01-15', warnings: 0, status: 'active', discord: 'coolgamer' },
  { id: 2, username: 'ProBuilder99', rank: 'Senior Member', avatar: 'PB', joined: '2023-08-20', warnings: 1, status: 'active', discord: 'probuilder' },
  { id: 3, username: 'SkyWalkerRBX', rank: 'Moderator', avatar: 'SW', joined: '2023-03-10', warnings: 0, status: 'active', discord: 'skywalker' },
  { id: 4, username: 'NightOwl456', rank: 'Member', avatar: 'NO', joined: '2024-03-01', warnings: 2, status: 'warned', discord: 'nightowl' },
  { id: 5, username: 'StarForge88', rank: 'Junior Member', avatar: 'SF', joined: '2024-04-12', warnings: 0, status: 'active' },
  { id: 6, username: 'PixelKnight', rank: 'Senior Member', avatar: 'PK', joined: '2023-11-05', warnings: 0, status: 'active', discord: 'pixelknight' },
  { id: 7, username: 'EmberFox', rank: 'Officer', avatar: 'EF', joined: '2023-06-22', warnings: 0, status: 'active' },
  { id: 8, username: 'VortexPrime', rank: 'Member', avatar: 'VP', joined: '2024-05-30', warnings: 3, status: 'warned', discord: 'vortex' },
];

export const MOCK_LOGS: MockLog[] = [
  { id: 1, action: 'promote', target: 'CoolGamer123', executor: 'Admin', detail: 'Member → Senior Member', time: '2 min ago', color: theme.green },
  { id: 2, action: 'warn', target: 'NightOwl456', executor: 'Admin', detail: 'Exploiting in games', time: '15 min ago', color: theme.amber },
  { id: 3, action: 'demote', target: 'StarForge88', executor: 'Admin', detail: 'Officer → Member', time: '1 hr ago', color: theme.orange },
  { id: 4, action: 'terminate', target: 'xXHackerXx', executor: 'Admin', detail: 'Ban evasion', time: '3 hrs ago', color: theme.red },
  { id: 5, action: 'sync', target: 'PixelKnight', executor: 'System', detail: 'Roblox rank synced to Discord', time: '5 hrs ago', color: theme.blue },
  { id: 6, action: 'promote', target: 'EmberFox', executor: 'SkyWalkerRBX', detail: 'Senior Member → Officer', time: '8 hrs ago', color: theme.green },
];

export const MOCK_COMMUNITIES: MockCommunity[] = [
  { id: 1, name: 'Nova Roleplay', members: 1240, rank: 'Owner', avatar: 'NR', color: theme.accent, mine: true, description: 'A premium Roblox roleplay community', groupId: '12345678', plan: 'PRO' },
  { id: 2, name: 'Eclipse Studios', members: 382, rank: 'Admin', avatar: 'ES', color: theme.blue, mine: true, description: 'Game development & scripting hub', groupId: '23456789', plan: 'STARTER' },
  { id: 3, name: 'Apex Combat', members: 5810, rank: 'Member', avatar: 'AC', color: theme.green, mine: false, description: 'Competitive PvP tournaments & events', groupId: '34567890', plan: 'ENTERPRISE' },
  { id: 4, name: 'Stellar RP', members: 2100, rank: 'Member', avatar: 'SR', color: theme.amber, mine: false, description: 'Story-driven roleplay experiences', groupId: '45678901', plan: 'PRO' },
];

export const MOCK_SESSIONS: MockSession[] = [
  { id: 1, title: 'Combat Training', host: 'SkyWalkerRBX', day: 'Saturday', time: '18:00', status: 'upcoming', notes: 'Bring your gear' },
  { id: 2, title: 'New Member Orientation', host: 'ProBuilder99', day: 'Sunday', time: '14:00', status: 'upcoming' },
  { id: 3, title: 'Weekly Staff Meeting', host: 'CoolGamer123', day: 'Monday', time: '20:00', status: 'completed', notes: 'Review rules' },
  { id: 4, title: 'Tournament Finals', host: 'EmberFox', day: 'Friday', time: '19:00', status: 'live' },
];

export const MOCK_ROLE_MAPS: MockRoleMap[] = [
  { id: 1, robloxRank: 'Co-Owner', robloxRankId: 255, discordRole: '@Owner', discordRoleId: '1102…001', enabled: true },
  { id: 2, robloxRank: 'Admin', robloxRankId: 200, discordRole: '@Admin', discordRoleId: '1102…002', enabled: true },
  { id: 3, robloxRank: 'Moderator', robloxRankId: 150, discordRole: '@Moderator', discordRoleId: '1102…003', enabled: true },
  { id: 4, robloxRank: 'Officer', robloxRankId: 100, discordRole: '@Staff', discordRoleId: '1102…004', enabled: false },
  { id: 5, robloxRank: 'Member', robloxRankId: 10, discordRole: '@Member', discordRoleId: '1102…005', enabled: true },
];

// Admin dashboard mock data
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  plan: 'STARTER' | 'PRO' | 'ENTERPRISE';
  communities: number;
  status: 'active' | 'suspended';
  joined: string;
}

export interface AdminTicket {
  id: number;
  subject: string;
  user: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'pending' | 'closed';
  updated: string;
}

export interface AdminSubscription {
  id: number;
  user: string;
  plan: 'STARTER' | 'PRO' | 'ENTERPRISE';
  mrr: number;
  status: 'active' | 'past_due' | 'cancelled' | 'trialing';
  renews: string;
}

export interface OpsEvent {
  id: number;
  level: 'info' | 'warn' | 'error';
  service: string;
  message: string;
  time: string;
}

export const ADMIN_USERS: AdminUser[] = [
  { id: 1, username: 'nova_owner', email: 'owner@novarp.gg', plan: 'PRO', communities: 2, status: 'active', joined: '2024-01-15' },
  { id: 2, username: 'eclipse_dev', email: 'dev@eclipse.io', plan: 'STARTER', communities: 1, status: 'active', joined: '2024-02-20' },
  { id: 3, username: 'apex_admin', email: 'staff@apexcombat.gg', plan: 'ENTERPRISE', communities: 4, status: 'active', joined: '2023-11-02' },
  { id: 4, username: 'spam_user_44', email: 'throwaway@mail.ru', plan: 'STARTER', communities: 0, status: 'suspended', joined: '2025-09-30' },
  { id: 5, username: 'stellar_lead', email: 'admin@stellarp.com', plan: 'PRO', communities: 1, status: 'active', joined: '2024-07-18' },
];

export const ADMIN_TICKETS: AdminTicket[] = [
  { id: 1041, subject: 'Discord bot not posting logs', user: 'nova_owner', priority: 'high', status: 'open', updated: '12 min ago' },
  { id: 1040, subject: 'Billing — double charge', user: 'apex_admin', priority: 'high', status: 'pending', updated: '1 hr ago' },
  { id: 1039, subject: 'How to add a second group?', user: 'eclipse_dev', priority: 'low', status: 'open', updated: '3 hrs ago' },
  { id: 1038, subject: 'Role sync delayed', user: 'stellar_lead', priority: 'medium', status: 'closed', updated: '1 day ago' },
];

export const ADMIN_SUBSCRIPTIONS: AdminSubscription[] = [
  { id: 1, user: 'nova_owner', plan: 'PRO', mrr: 12.99, status: 'active', renews: '2026-07-01' },
  { id: 2, user: 'eclipse_dev', plan: 'STARTER', mrr: 4.99, status: 'trialing', renews: '2026-06-20' },
  { id: 3, user: 'apex_admin', plan: 'ENTERPRISE', mrr: 29.99, status: 'active', renews: '2026-06-28' },
  { id: 4, user: 'stellar_lead', plan: 'PRO', mrr: 12.99, status: 'past_due', renews: '2026-06-10' },
];

export const OPS_EVENTS: OpsEvent[] = [
  { id: 1, level: 'error', service: 'webhook-delivery', message: 'EU-West queue latency exceeded 5s threshold', time: '14:48 UTC' },
  { id: 2, level: 'warn', service: 'roblox-bridge', message: 'Rate limit approaching (82% of quota)', time: '14:20 UTC' },
  { id: 3, level: 'info', service: 'auth', message: 'Rotated JWT signing keys', time: '12:00 UTC' },
  { id: 4, level: 'info', service: 'discord-bot', message: 'Reconnected to gateway shard 0', time: '09:31 UTC' },
  { id: 5, level: 'error', service: 'database', message: 'Slow query detected on audit_logs (1.2s)', time: '08:05 UTC' },
];

export const STATUS_COMPONENTS = [
  { id: 1, name: 'Website / Dashboard', status: 'operational', uptime: '99.98%' },
  { id: 2, name: 'Roblox API Bridge', status: 'operational', uptime: '99.91%' },
  { id: 3, name: 'Discord Bot', status: 'operational', uptime: '100.0%' },
  { id: 4, name: 'Authentication Service', status: 'operational', uptime: '99.99%' },
  { id: 5, name: 'Webhook Delivery', status: 'degraded', uptime: '98.42%' },
  { id: 6, name: 'Database', status: 'operational', uptime: '100.0%' },
] as const;

export const STATUS_INCIDENTS = [
  {
    id: 1,
    title: 'Webhook delivery delays',
    status: 'investigating',
    severity: 'minor',
    time: '23 May 2026, 14:32 UTC',
    updates: [
      { time: '14:32 UTC', msg: 'We are investigating reports of delayed webhook deliveries.' },
      { time: '14:48 UTC', msg: 'Issue identified — elevated queue latency on EU-West nodes. Fix in progress.' },
    ],
  },
  {
    id: 2,
    title: 'Roblox API rate limiting resolved',
    status: 'resolved',
    severity: 'minor',
    time: '19 May 2026, 09:10 UTC',
    updates: [
      { time: '09:10 UTC', msg: 'Increased error rates from Roblox API endpoints detected.' },
      { time: '09:55 UTC', msg: 'Roblox resolved the upstream issue. All services nominal.' },
    ],
  },
] as const;

export const STATUS_META: Record<string, { color: string; bg: string; border: string; label: string }> = {
  operational: { color: theme.green, bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)', label: 'Operational' },
  degraded: { color: theme.amber, bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', label: 'Degraded' },
  outage: { color: theme.red, bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', label: 'Major Outage' },
  maintenance: { color: theme.blue, bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.2)', label: 'Maintenance' },
};

export const PLAN_COLORS: Record<string, string> = {
  STARTER: theme.blue,
  PRO: theme.accent,
  ENTERPRISE: theme.accentBright,
};
