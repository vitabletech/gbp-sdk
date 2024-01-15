# SDK vs Raw Fetch

Why use `@vitabletech/gbp-sdk` instead of just using standard `fetch()` or `axios`?

When integrating with Google Business Profile, the actual HTTP request is only 10% of the work. The other 90% involves managing token lifecycles, handling pagination tokens across thousands of locations, dealing with aggressive rate limits, and wrestling with complex TypeScript definitions.

This SDK handles the 90% for you.

## Feature Comparison

| Feature | `@vitabletech/gbp-sdk` | Raw `fetch` or `axios` | `@googleapis/mybusiness` |
| --- | --- | --- | --- |
| **OAuth Token Refreshing** | ✔ Automatic & Thread-safe | ✘ Build it yourself | ✔ Requires `google-auth-library` |
| **Auto Pagination** | ✔ `listAll()` method | ✘ Manual `pageToken` loops | ✘ Manual loops |
| **Rate Limit Retries** | ✔ Exponential backoff built-in | ✘ Build it yourself | ✘ Manual |
| **Type Safety** | ✔ Strict TypeScript interfaces | ✘ Manual `any` casting | ⚠️ Complex/Generated types |
| **Generic Requests** | ✔ `client.request()` for new APIs | ✔ Native | ✘ Limited to published versions |
| **Bundle Size** | 🚀 Extremely lightweight | 🚀 Lightweight | 🐢 Very heavy (huge dependency tree) |

## Example Comparison: Fetching all Locations

Here is what it takes to fetch all locations for an account using standard `fetch`:

```typescript
// ❌ The Raw Fetch Way
let allLocations = [];
let pageToken = undefined;

do {
  // Wait, is my token expired? I need to check and refresh it first!
  const token = await getValidTokenSomehow(); 
  
  const query = pageToken ? `?pageToken=${pageToken}` : '';
  const response = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/accounts/123/locations${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  // Wait, what if I got a 429 Rate Limit error? I need to add retry logic here!
  if (response.status === 429) { /* ... manual backoff ... */ }
  
  const data = await response.json();
  allLocations = allLocations.concat(data.locations || []);
  pageToken = data.nextPageToken;
} while (pageToken);
```

Here is the exact same logic using our SDK:

```typescript
// ✅ The GBP SDK Way
const locations = await client.locations.listAll('accounts/123');
```
