# Token Storage

Google OAuth 2.0 access tokens expire very quickly (typically within 1 hour). The `@vitabletech/gbp-sdk` intercepts your requests, automatically exchanges your Refresh Token for a new Access Token, and caches the result so that subsequent requests are extremely fast.

To prevent the SDK from having to perform this OAuth handshake every time you restart your Node.js application, you must configure a `TokenStorage` provider.

## Built-in Providers

The SDK ships with two out-of-the-box storage providers.

### 1. File Storage (`'file'`)
Saves the tokens to a JSON file on your server's disk. This is the **recommended approach for single-server setups**. The tokens survive application restarts and crashes.

```typescript
const client = new GBPClient({
  // ... credentials
  tokenStorage: 'file',
  tokenFilePath: '/path/to/secure/gbp-tokens.json' // Optional, defaults to ./gbp-tokens.json
});
```

### 2. Memory Storage (`'memory'`)
Saves the tokens in RAM. This is the default if you omit the `tokenStorage` parameter.

**Warning**: If you use Memory Storage, the tokens are lost every time your Node.js process exits. Upon restarting, the SDK will be forced to make an immediate request to Google to fetch a new token, adding ~500ms of latency to your first API call.

```typescript
const client = new GBPClient({
  // ... credentials
  tokenStorage: 'memory'
});
```

## Custom Storage (Database Integration)

If you are running in a multi-server clustered environment (e.g., Kubernetes, Vercel Serverless, AWS Lambda), `'file'` storage will not work because disks are ephemeral or not shared.

In these cases, you should implement the `TokenStorage` interface to save and load tokens from your database (like Redis, PostgreSQL, or MongoDB).

```typescript
import { GBPClient, TokenStorage } from '@vitabletech/gbp-sdk';
import { redisClient } from './my-redis';

class RedisTokenStorage implements TokenStorage {
  async getToken(): Promise<string | null> {
    return await redisClient.get('gbp_access_token');
  }

  async setToken(token: string, expiresIn: number): Promise<void> {
    // Store token and set expiration to match Google's exact TTL
    await redisClient.set('gbp_access_token', token, { EX: expiresIn });
  }

  async getRefreshToken(): Promise<string | null> {
    return await redisClient.get('gbp_refresh_token');
  }

  async setRefreshToken(token: string): Promise<void> {
    await redisClient.set('gbp_refresh_token', token);
  }

  async clearTokens(): Promise<void> {
    await redisClient.del('gbp_access_token');
    await redisClient.del('gbp_refresh_token');
  }
}

// Pass your custom class directly to the client config
const client = new GBPClient({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  tokenStorage: new RedisTokenStorage()
});
```
