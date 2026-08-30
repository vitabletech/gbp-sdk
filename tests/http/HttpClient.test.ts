import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HttpClient } from '../../src/http/HttpClient';
import { TokenManager } from '../../src/authentication/TokenManager';
import {
  InsufficientScopeError,
  IAMPermissionError,
  RateLimitError,
} from '../../src/errors/GBPApiError';

describe('HttpClient Error Handling', () => {
  let httpClient: HttpClient;
  let mockTokenManager: TokenManager;
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    mockTokenManager = {
      getAccessToken: vi.fn().mockResolvedValue('fake-token'),
    } as unknown as TokenManager;

    httpClient = new HttpClient(mockTokenManager, {
      clientId: 'test',
      clientSecret: 'test',
      maxRetries: 0,
    });
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('throws InsufficientScopeError for 403 ACCESS_TOKEN_SCOPE_INSUFFICIENT', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: vi.fn().mockResolvedValue(
        JSON.stringify({
          error: {
            message:
              'Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project. ACCESS_TOKEN_SCOPE_INSUFFICIENT.',
            status: 'PERMISSION_DENIED',
          },
        })
      ),
    });

    await expect(httpClient.request({ url: '/test' })).rejects.toThrow(
      InsufficientScopeError
    );

    await expect(httpClient.request({ url: '/test' })).rejects.toThrow(
      'OAuth scope is missing.'
    );
  });

  it('throws IAMPermissionError for IAM permission denied', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 403,
      text: vi.fn().mockResolvedValue(
        JSON.stringify({
          error: {
            message: 'Permission denied on resource project 123.',
            status: 'PERMISSION_DENIED',
          },
        })
      ),
    });

    await expect(httpClient.request({ url: '/test' })).rejects.toThrow(
      IAMPermissionError
    );

    await expect(httpClient.request({ url: '/test' })).rejects.toThrow(
      'Google Cloud IAM permission is missing.'
    );
  });

  it('throws RateLimitError for 429', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      text: vi.fn().mockResolvedValue(
        JSON.stringify({
          error: {
            message: 'Quota exceeded.',
            status: 'RESOURCE_EXHAUSTED',
          },
        })
      ),
    });

    await expect(httpClient.request({ url: '/test' })).rejects.toThrow(
      RateLimitError
    );
  });
});
