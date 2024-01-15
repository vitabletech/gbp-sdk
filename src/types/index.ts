export interface GBPClientConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
  refreshToken?: string;
  tokenStorage?: 'memory' | 'file' | TokenStorage;
  tokenFilePath?: string;
  logger?: Logger;
  maxRetries?: number;
  timeoutMs?: number;
}

export interface TokenStorage {
  getToken(): Promise<string | null>;
  setToken(token: string, expiresIn: number): Promise<void>;
  getRefreshToken(): Promise<string | null>;
  setRefreshToken(token: string): Promise<void>;
  clearTokens(): Promise<void>;
}

export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: Record<string, string | number | boolean | undefined>;
  body?: any;
  headers?: Record<string, string>;
  timeoutMs?: number;
  retries?: number;
}
