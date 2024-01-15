# Custom Requests (Generic API)

Google releases updates to the Business Profile API frequently. Waiting for SDK maintainers to add strictly-typed wrapper methods for new endpoints can slow down your development.

To solve this, the `@vitabletech/gbp-sdk` exposes a powerful generic `request` method.

## When to use it
- A new Google API endpoint was released yesterday, and it's not in the SDK yet.
- You need to access a legacy or deprecated endpoint.
- You want to pass specialized HTTP headers that the wrapper methods don't expose.

## Why it exists
It gives you the best of both worlds:
1. You get **Automatic OAuth Refresh**, **Rate Limit Retries**, and **Error Mapping**.
2. But you retain the flexibility of a raw `fetch` call.

## Syntax

```typescript
await client.request<ExpectedResponseType>({
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT',
  url: string,
  query?: Record<string, any>,
  body?: any,
  headers?: Record<string, string>,
  timeoutMs?: number
});
```

## Example: Accessing a new API

Suppose Google releases a new endpoint: `https://mybusiness.googleapis.com/v1/accounts/123/newFeature`.

```typescript
// Define your expected response type for TypeScript support
interface NewFeatureResponse {
  featureId: string;
  isEnabled: boolean;
}

const data = await client.request<NewFeatureResponse>({
  method: 'POST',
  url: '/v1/accounts/123/newFeature', // Automatically prepends base URL
  query: {
    validateOnly: true
  },
  body: {
    settings: "custom"
  }
});

console.log(data.isEnabled); // Fully typed!
```

## Best Practices
- **Use absolute URLs** if you need to hit an entirely different Google API (like `https://oauth2.googleapis.com/tokeninfo`). The SDK detects absolute URLs and won't prepend the default base URL.
- **Provide a generic type** `<T>` so that the return value is strongly typed, ensuring your downstream code remains safe.
