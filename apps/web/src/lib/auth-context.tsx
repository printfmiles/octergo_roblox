import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { API_ROUTES } from '@octergo/shared';
import type { UserProfile } from '@octergo/shared';
import { api } from './api';
import { clearSession, getAccessToken, loadStoredSession } from './auth';

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  error: string;
  isAuthenticated: boolean;
  refreshUser: () => Promise<UserProfile | null>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshUser = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setUser(null);
      setError('');
      return null;
    }

    setError('');
    try {
      const profile = await api.get<UserProfile>(API_ROUTES.AUTH.ME);
      setUser(profile);
      return profile;
    } catch {
      clearSession();
      setUser(null);
      setError('Your session expired. Please sign in again.');
      return null;
    }
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
    setError('');
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      setLoading(true);
      const stored = loadStoredSession();
      if (!stored) {
        if (!cancelled) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      await refreshUser();
      if (!cancelled) setLoading(false);
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [refreshUser]);

  useEffect(() => {
    function onUnauthorized() {
      clearSession();
      setUser(null);
      setError('Your session expired. Please sign in again.');
    }

    window.addEventListener('octergo:unauthorized', onUnauthorized);
    return () => window.removeEventListener('octergo:unauthorized', onUnauthorized);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        refreshUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function userSubtitle(user: UserProfile, communityCount: number): string {
  if (user.role === 'ADMIN') return 'Platform Admin';
  if (communityCount > 0) return 'Community Owner';
  if (user.discordVerified && user.discordUsername) return `@${user.discordUsername}`;
  if (user.robloxVerified && user.robloxUsername) return user.robloxUsername;
  return user.email;
}
