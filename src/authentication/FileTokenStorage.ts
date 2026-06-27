import { promises as fs } from 'fs';
import * as path from 'path';
import { TokenStorage } from '../types';

interface TokenData {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export class FileTokenStorage implements TokenStorage {
  private filePath: string;
  private memoryCache: TokenData = {
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
  };
  private isLoaded = false;

  constructor(filePath?: string) {
    this.filePath = filePath || path.join(process.cwd(), 'gbp-tokens.json');
  }

  private async loadFromFile(): Promise<void> {
    if (this.isLoaded) return;
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      this.memoryCache = JSON.parse(data);
    } catch (error: any) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
      // If file doesn't exist, we just start with empty cache
    }
    this.isLoaded = true;
  }

  private async saveToFile(): Promise<void> {
    await fs.writeFile(
      this.filePath,
      JSON.stringify(this.memoryCache, null, 2),
      'utf-8'
    );
  }

  async getToken(): Promise<string | null> {
    await this.loadFromFile();
    if (!this.memoryCache.accessToken) return null;

    // Buffer of 60 seconds
    if (
      this.memoryCache.expiresAt &&
      Date.now() >= this.memoryCache.expiresAt - 60000
    ) {
      return null;
    }

    return this.memoryCache.accessToken;
  }

  async setToken(token: string, expiresInSeconds: number): Promise<void> {
    await this.loadFromFile();
    this.memoryCache.accessToken = token;
    this.memoryCache.expiresAt = Date.now() + expiresInSeconds * 1000;
    await this.saveToFile();
  }

  async getRefreshToken(): Promise<string | null> {
    await this.loadFromFile();
    return this.memoryCache.refreshToken;
  }

  async setRefreshToken(token: string): Promise<void> {
    await this.loadFromFile();
    this.memoryCache.refreshToken = token;
    await this.saveToFile();
  }

  async clearTokens(): Promise<void> {
    this.memoryCache = {
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
    };
    await this.saveToFile();
  }
}
