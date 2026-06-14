import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import {
  MOCK_LOGS,
  MOCK_MEMBERS,
  MOCK_ROLE_MAPS,
  MOCK_SESSIONS,
  type MockLog,
  type MockMember,
  type MockRoleMap,
  type MockSession,
} from './mock';
import { theme } from '../theme';
import type { ModAction } from '../features/moderation/ModerationModal';

interface Store {
  members: MockMember[];
  logs: MockLog[];
  sessions: MockSession[];
  roleMaps: MockRoleMap[];
  applyAction: (action: ModAction, member: MockMember, newRank: string, reason: string) => void;
  setSessions: React.Dispatch<React.SetStateAction<MockSession[]>>;
  setRoleMaps: React.Dispatch<React.SetStateAction<MockRoleMap[]>>;
  addSyncLog: (target: string, detail: string) => void;
}

const StoreContext = createContext<Store | null>(null);

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within DashboardDataProvider');
  return ctx;
}

const COLOR: Record<ModAction, string> = {
  promote: theme.green,
  demote: theme.orange,
  warn: theme.amber,
  terminate: theme.red,
};

export function DashboardDataProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<MockMember[]>(MOCK_MEMBERS);
  const [logs, setLogs] = useState<MockLog[]>(MOCK_LOGS);
  const [sessions, setSessions] = useState<MockSession[]>(MOCK_SESSIONS);
  const [roleMaps, setRoleMaps] = useState<MockRoleMap[]>(MOCK_ROLE_MAPS);

  function applyAction(action: ModAction, member: MockMember, newRank: string, reason: string) {
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
        id: Date.now(),
        action,
        target: member.username,
        executor: 'Admin',
        detail,
        time: 'just now',
        color: COLOR[action],
      },
      ...prev,
    ]);
  }

  function addSyncLog(target: string, detail: string) {
    setLogs((prev) => [
      { id: Date.now(), action: 'sync', target, executor: 'System', detail, time: 'just now', color: theme.blue },
      ...prev,
    ]);
  }

  return (
    <StoreContext.Provider
      value={{ members, logs, sessions, roleMaps, applyAction, setSessions, setRoleMaps, addSyncLog }}
    >
      {children}
    </StoreContext.Provider>
  );
}
