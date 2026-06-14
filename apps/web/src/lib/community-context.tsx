import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { API_ROUTES } from '@octergo/shared';
import type { CommunitySummary } from '@octergo/shared';
import { api } from './api';

interface CommunityContextValue {
  communities: CommunitySummary[];
  activeCommunity: CommunitySummary | null;
  activeCommunityId: string | null;
  setActiveCommunityId: (id: string) => void;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
}

const CommunityContext = createContext<CommunityContextValue | null>(null);

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error('useCommunity must be used within CommunityProvider');
  return ctx;
}

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [communities, setCommunities] = useState<CommunitySummary[]>([]);
  const [activeCommunityId, setActiveCommunityIdState] = useState<string | null>(
    () => localStorage.getItem('activeCommunityId'),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setError('');
    try {
      const list = await api.get<CommunitySummary[]>(API_ROUTES.COMMUNITIES);
      setCommunities(list);

      if (list.length === 0) {
        setActiveCommunityIdState(null);
        localStorage.removeItem('activeCommunityId');
        return;
      }

      const stored = localStorage.getItem('activeCommunityId');
      const valid = list.find((c) => c.id === stored);
      const nextId = valid?.id ?? list.find((c) => c.verificationStatus === 'VERIFIED')?.id ?? list[0].id;
      setActiveCommunityIdState(nextId);
      localStorage.setItem('activeCommunityId', nextId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load communities');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      await refresh();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  function setActiveCommunityId(id: string) {
    setActiveCommunityIdState(id);
    localStorage.setItem('activeCommunityId', id);
  }

  const activeCommunity = communities.find((c) => c.id === activeCommunityId) ?? null;

  return (
    <CommunityContext.Provider
      value={{
        communities,
        activeCommunity,
        activeCommunityId,
        setActiveCommunityId,
        loading,
        error,
        refresh,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}
