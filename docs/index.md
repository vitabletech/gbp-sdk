---
layout: home

hero:
  name: 'Google Business Profile SDK'
  text: 'The most complete TypeScript SDK for the Google Business Profile APIs.'
  tagline: '✔ Automatic OAuth Refresh • ✔ TypeScript First • ✔ Auto Pagination • ✔ Retry Support • ✔ Rate Limiting • ✔ Generic Request API • ✔ Enterprise Ready'
  image:
    src: /hero-graphic.webp
    alt: GBP SDK Hero Image
  actions:
    - theme: brand
      text: Quick Start
      link: /getting-started/introduction
    - theme: alt
      text: API Reference
      link: /api-reference/gbpclient

features:
  - title: Authentication
    details: Zero-config OAuth 2.0 flow with automatic token refreshing and file/memory storage.
    link: /getting-started/authentication
  - title: Auto Pagination
    details: Never deal with `pageToken` again. Fetch thousands of locations and reviews automatically.
    link: /guides/pagination
  - title: Custom Requests
    details: Generic request API to access new Google endpoints the day they are released.
    link: /guides/custom-requests
  - title: Middleware
    details: Intercept requests and responses globally to add custom logging or transformations.
    link: /guides/middleware
  - title: Type Safety
    details: Full TypeScript definitions for all major endpoints to catch errors at compile time.
  - title: Error Handling
    details: Detailed custom error classes like `RateLimitError` and `AuthenticationError`.
    link: /guides/error-handling
---

## Quick Installation

::: code-group

```bash [npm]
npm install @vitabletech/gbp-sdk
```

:::

## Quick Example

```typescript
import { GBPClient } from '@vitabletech/gbp-sdk';

const client = new GBPClient({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/oauth/callback',
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
});

// Automatically handles tokens, paginates through all pages,
// and returns all accounts as a strongly typed array.
const accounts = await client.accounts.listAll();
```
