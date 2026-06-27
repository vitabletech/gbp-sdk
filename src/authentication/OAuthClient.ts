import { GBPClientConfig, Logger } from '../types';
import { AuthenticationError } from '../errors/GBPApiError';
import { SilentLogger } from '../utils/Logger';

export class OAuthClient {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private logger: Logger;
  private tokenEndpoint = 'https://oauth2.googleapis.com/token';
  private authEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  constructor(config: GBPClientConfig) {
    if (!config.clientId || !config.clientSecret) {
      throw new AuthenticationError(
        'clientId and clientSecret are required for OAuthClient'
      );
    }
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri =
      config.redirectUri || 'http://localhost:3000/oauth2callback';
    this.logger = config.logger || new SilentLogger();
  }

  public getAuthorizationUrl(scopes: string[], state?: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: scopes.join(' '),
      access_type: 'offline',
      prompt: 'consent',
    });

    if (state) {
      params.append('state', state);
    }

    return `${this.authEndpoint}?${params.toString()}`;
  }

  public async getTokensFromCode(code: string): Promise<{
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  }> {
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.redirectUri,
    });

    return this.requestTokens(params);
  }

  public async refreshAccessToken(refreshToken: string): Promise<{
    access_token: string;
    expires_in: number;
  }> {
    this.logger.debug('Refreshing access token...');
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    return this.requestTokens(params);
  }

  private async requestTokens(params: URLSearchParams): Promise<any> {
    try {
      const response = await fetch(this.tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new AuthenticationError(
          `Failed to fetch tokens: ${data.error_description || data.error || response.statusText}`,
          {
            responseBody: data,
            status: response.status,
          }
        );
      }

      return data;
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new AuthenticationError(`Token request failed: ${error.message}`);
    }
  }
}
