export interface GBPClientConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
  refreshToken?: string;
  scopes?: string[];
  enableQuotaAccess?: boolean;
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

export const GBP_SCOPES = {
  businessManage: 'https://www.googleapis.com/auth/business.manage',
  cloudQuotaReadOnly:
    'https://www.googleapis.com/auth/cloud-platform.read-only',
};

export const GBP_SERVICES = {
  businessInformation: 'mybusinessbusinessinformation.googleapis.com',
  accountManagement: 'mybusinessaccountmanagement.googleapis.com',
  verifications: 'mybusinessverifications.googleapis.com',
  qanda: 'mybusinessqanda.googleapis.com',
  lodging: 'mybusinesslodging.googleapis.com',
  placeActions: 'mybusinessplaceactions.googleapis.com',
  legacy: 'mybusiness.googleapis.com',
};

export interface QuotaRequestOptions {
  projectId: string;
  service: string;
}

export interface QuotaLimit {
  value: string;
}

export interface QuotaBucket {
  effectiveLimit?: string;
  defaultLimit?: string;
  dimensions?: Record<string, string>;
}

export interface QuotaMetric {
  metric: string;
  displayName: string;
  limit: number | null;
  unit: string;
}

export interface NormalizedQuotasResponse {
  projectId: string;
  service: string;
  quotas: QuotaMetric[];
}
