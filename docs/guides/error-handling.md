# Error Handling

The `@vitabletech/gbp-sdk` throws specifically typed custom errors to help you programmatically handle different failure scenarios. This replaces generic network errors with actionable, context-aware exceptions.

## Base Error: `GBPApiError`
All errors thrown by the SDK inherit from `GBPApiError`. You can use this for global catch blocks.

```typescript
import { GBPApiError } from '@vitabletech/gbp-sdk';

try {
  await client.accounts.listAll();
} catch (error) {
  if (error instanceof GBPApiError) {
    console.error('API Error Status:', error.status); // e.g. 404
    console.error('Original Google Error:', error.details.responseBody);
  }
}
```

## Specific Errors

### `AuthenticationError`
Thrown when the SDK fails to authenticate with Google.

- **Status Code**: 401
- **Possible Causes**: 
  - Expired or revoked `refreshToken`.
  - Invalid `clientId` or `clientSecret`.
- **How to Fix**: Redirect the user to the Google Login flow to obtain a new refresh token.

```typescript
import { AuthenticationError } from '@vitabletech/gbp-sdk';

catch (error) {
  if (error instanceof AuthenticationError) {
    // Force user to log in again
    redirectToLogin();
  }
}
```

### `RateLimitError`
Thrown when your application exceeds Google's API quotas. 

*Note: The SDK automatically retries rate-limited requests using exponential backoff up to the configured `maxRetries`. This error is only thrown if all retries fail.*

- **Status Code**: 429
- **Possible Causes**: Exceeding Queries Per Minute (QPM) or Daily quotas.
- **How to Fix**: Ask for higher quotas in Google Cloud Console, or implement queuing on your backend.

### `TimeoutError`
Thrown if the Google API does not respond within the configured `timeoutMs` limit.

- **How to Fix**: Increase `timeoutMs` when initializing the client, especially if you are uploading large media files.

### `NetworkError`
Thrown when the DNS lookup fails, or the server is completely unreachable (e.g. your application loses internet connection).

## Google API Validation Errors (400)
If you pass invalid parameters (e.g., a missing `readMask`), it will throw a `GBPApiError` with a status of 400.

You can inspect the `error.details.responseBody` to see exactly what Google rejected:

```json
{
  "error": {
    "code": 400,
    "message": "Request contains an invalid argument.",
    "status": "INVALID_ARGUMENT",
    "details": [...]
  }
}
```
