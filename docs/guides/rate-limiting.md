# Rate Limiting & Retries

Google enforces strict Quota Limits on the Business Profile APIs (e.g., maximum Queries Per Minute, or maximum Queries Per Day).

When you exceed these limits, Google rejects the API request with an HTTP 429 status code.

In a traditional application, you would have to catch this error, pause your thread using a `setTimeout`, and manually try the request again. The `@vitabletech/gbp-sdk` implements a robust **Retry Policy with Exponential Backoff** built directly into its HTTP layer to solve this for you automatically.

## How it works

When the SDK receives an HTTP 429 (Rate Limit Exceeded), 500 (Internal Server Error), or 503 (Service Unavailable) from Google:

1. It pauses execution for a short duration (e.g., 500ms).
2. It retries the exact same request automatically.
3. If it fails again, it increases the pause duration exponentially (e.g., 1000ms, then 2000ms, then 4000ms).
4. If it exhausts the maximum number of retries, it finally throws a `RateLimitError` or `GBPApiError` to your application.

This means minor network hiccups or momentary quota spikes are completely invisible to your application logic!

## Configuration

You can configure the retry behavior when initializing the client.

```typescript
const client = new GBPClient({
  clientId: '...',
  clientSecret: '...',
  
  // The maximum number of times to retry a failed request.
  // Set to 0 to disable retries entirely.
  // Default: 3
  maxRetries: 5,
  
  // The maximum time (in milliseconds) the SDK should wait for a single 
  // request to complete before throwing a TimeoutError.
  // Default: 30000 (30 seconds)
  timeoutMs: 60000 
});
```

## Handling persistent RateLimitErrors

If you configure `maxRetries: 3`, and the 3rd retry still returns a 429, the SDK gives up and throws a `RateLimitError`. 

If you see this error frequently, it means you are genuinely exceeding your Google Cloud Quotas and need to either:
1. Implement job queuing on your backend to throttle how fast you call the SDK.
2. Request a Quota Increase from Google Cloud Console.

```typescript
import { RateLimitError } from '@vitabletech/gbp-sdk';

try {
  await client.accounts.listAll();
} catch (error) {
  if (error instanceof RateLimitError) {
    console.error("Critical: Google Quotas exceeded. Please slow down.");
  }
}
```
