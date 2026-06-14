import { API_ROUTES } from '@octergo/shared';
import { api } from './api';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function loadStoredSession(): boolean {
  return !!getAccessToken();
}

export function saveSession(tokens: AuthTokens) {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export function clearSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function login(email: string, password: string): Promise<AuthTokens> {
  const tokens = await api.post<AuthTokens>(API_ROUTES.AUTH.LOGIN, { email, password });
  saveSession(tokens);
  return tokens;
}

export async function register(
  email: string,
  password: string,
  username: string,
): Promise<AuthTokens> {
  const tokens = await api.post<AuthTokens>(API_ROUTES.AUTH.REGISTER, {
    email,
    password,
    username,
  });
  saveSession(tokens);
  return tokens;
}

/** @deprecated Use useAuth().signOut() */
export function logout() {
  clearSession();
}

/** @deprecated Use useAuth().isAuthenticated */
export function isAuthenticated(): boolean {
  return loadStoredSession();
}
