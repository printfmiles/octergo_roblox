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

export async function login(email: string, password: string): Promise<AuthUser> {
  const tokens = await api.post<AuthTokens>(API_ROUTES.AUTH.LOGIN, { email, password });
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  return api.get<AuthUser>(API_ROUTES.AUTH.ME);
}

export async function register(
  email: string,
  password: string,
  username: string,
): Promise<AuthUser> {
  const tokens = await api.post<AuthTokens>(API_ROUTES.AUTH.REGISTER, {
    email,
    password,
    username,
  });
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  return api.get<AuthUser>(API_ROUTES.AUTH.ME);
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('accessToken');
}
