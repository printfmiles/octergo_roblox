import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { API_ROUTES } from '@octergo/shared';
import type { AuditLogEntry, MemberSummary, RoleMapping } from '@octergo/shared';
import { api } from './api';
import { useCommunity } from './community-context';
import { theme } from '../theme';
import type { ModAction } from '../features/moderation/ModerationModal';

export interface DashboardMember {
  id: string;
  username: string;
  rank: string;
  rankId: number | null;
  avatar: string;
  joined: string;
  warnings: number;
  status: 'active' | 'warned' | 'terminated';
  discord: string | null;
  verificationStatus: string;
}

export interface DashboardLog {
  id: string;
  action: string;
  target: string;
  executor: string;
  detail: string;
  time: string;
  color: string;
}

interface Store {
  members: DashboardMember[];
  logs: DashboardLog[];
  roleMaps: RoleMapping[];
  membersLoading: boolean;
  roleMapsLoading: boolean;
  refreshMembers: () => Promise<void>;
  refreshRoleMaps: () => Promise<void>;
  refreshLogs: () => Promise<void>;
  applyAction: (action: ModAction, member: DashboardMember, newRank: string, reason: string) => void;
  addSyncLog: (target: string, detail: string) => void;
}

const StoreContext = createContext<Store | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within DashboardDataProvider');
  return ctx;
}

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString();
}

function formatTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 60000) return 'just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return new Date(iso).toLocaleDateString();
}

const ACTION_COLORS: Record<string, string> = {
  WARN: theme.amber,
  PROMOTE: theme.green,
  DEMOTE: theme.orange,
  TERMINATE: theme.red,
  SYNC: theme.blue,
};

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const { activeCommunityId } = useCommunity();
  const [members, setMembers] = useState<DashboardMember[]>([]);
  const [logs, setLogs] = useState<DashboardLog[]>([]);
  const [roleMaps, setRoleMaps] = useState<RoleMapping[]>([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const [roleMapsLoading, setRoleMapsLoading] = useState(false);

  const refreshMembers = useCallback(async () => {
    if (!activeCommunityId) {
      setMembers([]);
      return;
    }
    setMembersLoading(true);
    try {
      const data = await api.get<MemberSummary[]>(
        `${API_ROUTES.MEMBERS}/community/${activeCommunityId}`,
      );
      setMembers(
        data.map((m) => ({
          id: m.id,
          username: m.robloxUsername,
          rank: m.rankName,
          rankId: m.rankId,
          avatar: initials(m.robloxUsername),
          joined: formatDate(m.robloxJoinedAt),
          warnings: m.warnings,
          status: m.warnings > 0 ? 'warned' : 'active',
          discord: m.verificationStatus === 'VERIFIED' ? m.robloxUsername.toLowerCase() : null,
          verificationStatus: m.verificationStatus,
        })),
      );
    } catch {
      setMembers([]);
    } finally {
      setMembersLoading(false);
    }
  }, [activeCommunityId]);

  const refreshRoleMaps = useCallback(async () => {
    if (!activeCommunityId) {
      setRoleMaps([]);
      return;
    }
    setRoleMapsLoading(true);
    try {
      const data = await api.get<RoleMapping[]>(
        `${API_ROUTES.ROLES}/community/${activeCommunityId}`,
      );
      setRoleMaps(data);
    } catch {
      setRoleMaps([]);
    } finally {
      setRoleMapsLoading(false);
    }
  }, [activeCommunityId]);

  const refreshLogs = useCallback(async () => {
    if (!activeCommunityId) {
      setLogs([]);
      return;
    }
    try {
      const data = await api.get<
        Array<{
          id: string;
          action: string;
          targetUsername: string;
          detail: string;
          createdAt: string;
          executor?: { username: string } | null;
        }>
      >(`${API_ROUTES.AUDIT_LOGS}/community/${activeCommunityId}`);
      setLogs(
        data.map((l) => ({
          id: l.id,
          action: l.action.toLowerCase(),
          target: l.targetUsername,
          executor: l.executor?.username ?? 'System',
          detail: l.detail,
          time: formatTime(l.createdAt),
          color: ACTION_COLORS[l.action] ?? theme.textDim,
        })),
      );
    } catch {
      setLogs([]);
    }
  }, [activeCommunityId]);

  useEffect(() => {
    refreshMembers();
    refreshRoleMaps();
    refreshLogs();
  }, [refreshMembers, refreshRoleMaps, refreshLogs]);

  function applyAction(action: ModAction, member: DashboardMember, newRank: string, reason: string) {
    let detail = reason || 'No reason given';
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== member.id) return m;
        const next = { ...m };
        if (action === 'promote' || action === 'demote') {
          detail = `${m.rank} → ${newRank}`;
          next.rank = newRank;
        }
        if (action === 'warn') {
          detail = reason || 'Rule violation';
          next.warnings += 1;
          next.status = 'warned';
        }
        if (action === 'terminate') {
          detail = reason || 'Terminated';
          next.status = 'terminated';
        }
        return next;
      }),
    );
    setLogs((prev) => [
      {
        id: String(Date.now()),
        action,
        target: member.username,
        executor: 'You',
        detail,
        time: 'just now',
        color: ACTION_COLORS[action.toUpperCase()] ?? theme.textDim,
      },
      ...prev,
    ]);
  }

  function addSyncLog(target: string, detail: string) {
    setLogs((prev) => [
      {
        id: String(Date.now()),
        action: 'sync',
        target,
        executor: 'System',
        detail,
        time: 'just now',
        color: theme.blue,
      },
      ...prev,
    ]);
  }

  return (
    <StoreContext.Provider
      value={{
        members,
        logs,
        roleMaps,
        membersLoading,
        roleMapsLoading,
        refreshMembers,
        refreshRoleMaps,
        refreshLogs,
        applyAction,
        addSyncLog,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
