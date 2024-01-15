import { GBPClientConfig, Logger, TokenStorage } from '../types';
import { OAuthClient } from './OAuthClient';
import { MemoryTokenStorage } from './MemoryTokenStorage';
import { FileTokenStorage } from './FileTokenStorage';
import { AuthenticationError } from '../errors/GBPApiError';
import { SilentLogger } from '../utils/Logger';

export class TokenManager {
  private oauthClient: OAuthClient;
  private storage: TokenStorage;
  private logger: Logger;
  private refreshPromise: Promise<string> | null = null;

  constructor(config: GBPClientConfig) {
    this.logger = config.logger || new SilentLogger();
    this.oauthClient = new OAuthClient(config);
    this.storage = this.initializeStorage(config);
    
    if (config.refreshToken) {
      this.storage.setRefreshToken(config.refreshToken);
    }
  }

  private initializeStorage(config: GBPClientConfig): TokenStorage {
    if (config.tokenStorage === 'memory' || !config.tokenStorage) {
      return new MemoryTokenStorage();
    }
    if (config.tokenStorage === 'file') {
      return new FileTokenStorage(config.tokenFilePath);
    }
    return config.tokenStorage as TokenStorage;
  }

  public getOAuthClient(): OAuthClient {
    return this.oauthClient;
  }

  public async getAccessToken(): Promise<string> {
    let token = await this.storage.getToken();
    if (token) {
      return token;
    }

    const refreshToken = await this.storage.getRefreshToken();
    if (!refreshToken) {
      throw new AuthenticationError('No access token available and no refresh token found to generate a new one.');
    }

    return this.refreshAccessToken(refreshToken);
  }

  private async refreshAccessToken(refreshToken: string): Promise<string> {
    // Thread safety: if a refresh is already in progress, wait for it
    if (this.refreshPromise) {
      this.logger.debug('Token refresh already in progress, waiting...');
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const data = await this.oauthClient.refreshAccessToken(refreshToken);
        await this.storage.setToken(data.access_token, data.expires_in);
        return data.access_token;
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  public async processAuthCode(code: string): Promise<void> {
    const data = await this.oauthClient.getTokensFromCode(code);
    await this.storage.setToken(data.access_token, data.expires_in);
    if (data.refresh_token) {
      await this.storage.setRefreshToken(data.refresh_token);
    }
  }

  public async clearTokens(): Promise<void> {
    await this.storage.clearTokens();
  }

  public async getTokenInfo(): Promise<any> {
    const token = await this.getAccessToken();
    const response = await fetch('https://oauth2.googleapis.com/tokeninfo', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new AuthenticationError(`Failed to fetch token info: ${response.statusText}`);
    }

    return response.json();
  }
}
