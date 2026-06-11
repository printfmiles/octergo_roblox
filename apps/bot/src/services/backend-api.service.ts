import { env } from '../config/env';

export class BackendApiService {
  private readonly baseUrl = env.apiUrl;
  private readonly secret = env.botInternalSecret;

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}/bot-internal${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-bot-secret': this.secret,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API error ${res.status}: ${text}`);
    }

    return res.json() as Promise<T>;
  }
}

export const backendApi = new BackendApiService();
