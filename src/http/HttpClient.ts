import { GBPClientConfig, Logger, RequestOptions } from '../types';
import { TokenManager } from '../authentication/TokenManager';
import { RetryPolicy } from './RetryPolicy';
import {
  GBPApiError,
  RateLimitError,
  AuthenticationError,
  TimeoutError,
  NetworkError,
} from '../errors/GBPApiError';
import { SilentLogger } from '../utils/Logger';

export class HttpClient {
  private tokenManager: TokenManager;
  public logger: Logger;
  private retryPolicy: RetryPolicy;
  private defaultTimeoutMs: number;
  private defaultBaseUrl = 'https://mybusiness.googleapis.com';

  constructor(tokenManager: TokenManager, config: GBPClientConfig) {
    this.tokenManager = tokenManager;
    this.logger = config.logger || new SilentLogger();
    this.retryPolicy = new RetryPolicy(config.maxRetries || 3);
    this.defaultTimeoutMs = config.timeoutMs || 30000;
  }

  public async request<T = any>(options: RequestOptions): Promise<T> {
    const url = this.buildUrl(options.url, options.query);
    let retryCount = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const accessToken = await this.tokenManager.getAccessToken();
      const headers = new Headers((options.headers as any) || {});

      if (!headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      if (
        !headers.has('Content-Type') &&
        options.body &&
        !(options.body instanceof FormData)
      ) {
        headers.set('Content-Type', 'application/json');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        options.timeoutMs || this.defaultTimeoutMs
      );

      const requestInit: RequestInit = {
        method: options.method || 'GET',
        headers,
        body: this.prepareBody(options.body),
        signal: controller.signal,
      };

      try {
        this.logger.debug(`[${requestInit.method}] ${url}`);
        const response = await fetch(url, requestInit);
        clearTimeout(timeoutId);

        if (response.ok) {
          if (response.status === 204) {
            return {} as T;
          }
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          return response.text() as unknown as T;
        }

        const errorBody = await this.parseErrorBody(response);

        if (this.retryPolicy.shouldRetry(response.status, retryCount)) {
          this.logger.warn(
            `Request failed with status ${response.status}. Retrying (${retryCount + 1})...`
          );
          await this.retryPolicy.wait(retryCount);
          retryCount++;
          continue;
        }

        throw this.createError(
          response.status,
          errorBody,
          url,
          options.method || 'GET'
        );
      } catch (error: any) {
        clearTimeout(timeoutId);

        if (error instanceof GBPApiError) {
          throw error;
        }

        if (error.name === 'AbortError') {
          throw new TimeoutError(
            `Request timeout after ${options.timeoutMs || this.defaultTimeoutMs}ms`
          );
        }

        throw new NetworkError(`Network request failed: ${error.message}`);
      }
    }
  }

  private buildUrl(urlPath: string, query?: Record<string, any>): string {
    const isAbsolute = /^https?:\/\//i.test(urlPath);
    const baseUrl = isAbsolute
      ? urlPath
      : `${this.defaultBaseUrl}${urlPath.startsWith('/') ? urlPath : '/' + urlPath}`;

    if (!query || Object.keys(query).length === 0) {
      return baseUrl;
    }

    const url = new URL(baseUrl);
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  private prepareBody(body: any): BodyInit | null | undefined {
    if (!body) return undefined;
    if (
      typeof body === 'string' ||
      body instanceof FormData ||
      body instanceof URLSearchParams
    ) {
      return body;
    }
    return JSON.stringify(body);
  }

  private async parseErrorBody(response: Response): Promise<any> {
    try {
      const text = await response.text();
      if (!text) return null;
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  private createError(
    status: number,
    responseBody: any,
    url: string,
    method: string
  ): GBPApiError {
    const message =
      responseBody?.error?.message ||
      `API request failed with status ${status}`;
    const code = responseBody?.error?.status || responseBody?.error?.code;

    if (status === 401) {
      return new AuthenticationError(message, {
        code,
        url,
        method,
        responseBody,
      });
    }
    if (status === 429) {
      return new RateLimitError(message, { code, url, method, responseBody });
    }

    return new GBPApiError(message, status, {
      code,
      url,
      method,
      responseBody,
    });
  }
}
