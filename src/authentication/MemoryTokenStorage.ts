import { TokenStorage } from '../types';

export class MemoryTokenStorage implements TokenStorage {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private expiresAt: number | null = null;

  async getToken(): Promise<string | null> {
    if (!this.accessToken) return null;

    // Buffer of 60 seconds
    if (this.expiresAt && Date.now() >= this.expiresAt - 60000) {
      return null;
    }

    return this.accessToken;
  }

  async setToken(token: string, expiresInSeconds: number): Promise<void> {
    this.accessToken = token;
    this.expiresAt = Date.now() + expiresInSeconds * 1000;
  }

  async getRefreshToken(): Promise<string | null> {
    return this.refreshToken;
  }

  async setRefreshToken(token: string): Promise<void> {
    this.refreshToken = token;
  }

  async clearTokens(): Promise<void> {
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresAt = null;
  }
}
