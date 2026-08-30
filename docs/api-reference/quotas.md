---
title: QuotasService
description: 'The `QuotasService` allows you to programmatically fetch Google Cloud Service Usage Quota Limits for Google Business Profile APIs without leaving your application.'
---

# QuotasService

The `QuotasService` allows you to retrieve Google Cloud Service Usage Quota limits for any Google Business Profile API. Because Google imposes strict maximum daily and per-minute quota limits on read and write actions, being able to programmatically check your quotas directly within the SDK allows you to intelligently pace or pause your jobs before encountering `429 RateLimitExceeded` errors.

[Google Cloud: API Quotas Overview](https://docs.cloud.google.com/docs/quotas/api-overview)

> [!IMPORTANT]
> To use the `QuotasService`, you **MUST** ensure you request the additional `https://www.googleapis.com/auth/cloud-platform.read-only` scope during the OAuth flow, and enable `enableQuotaAccess: true` when instantiating your `GBPClient`.

## Initializing the SDK with Quotas Enabled

You must explicitly tell the SDK that you want to check quotas. This will automatically include the required scope in your authentication requests.

```typescript
import { GBPClient, GBP_SCOPES } from '@vitabletech/gbp-sdk';

const client = new GBPClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URI',
  enableQuotaAccess: true, // [!code focus] Enables quota access
});

// The authentication URL will now automatically include BOTH scopes:
// - https://www.googleapis.com/auth/business.manage
// - https://www.googleapis.com/auth/cloud-platform.read-only
const authUrl = await client.auth.generateAuthUrl();
```

## Helper Methods

The SDK provides dedicated helper functions to fetch quotas for all standard Google Business Profile API services so you don't have to remember the exact service strings:

```typescript
// Fetch quotas for the Business Information API (Locations, Categories, etc)
const infoQuotas =
  await client.quotas.getBusinessInformation('your-project-id');

// Fetch quotas for Account Management (Accounts, Admins)
const accountQuotas =
  await client.quotas.getAccountManagement('your-project-id');

// Fetch quotas for Verifications
const verifQuotas = await client.quotas.getVerifications('your-project-id');

// Other helpers
await client.quotas.getQAndA('your-project-id');
await client.quotas.getLodging('your-project-id');
await client.quotas.getPlaceActions('your-project-id');
await client.quotas.getLegacy('your-project-id');
```

## Available GBP API Services

For Google Business Profile APIs, Google has broken down the functionality into several distinct granular API services. You can query the quotas for any of them by passing the exact service name.

Here is the list of the primary GBP API services you can check quotas for:

1. **`mybusinessbusinessinformation.googleapis.com`** _(Most Common)_
   - Quotas for creating, updating, and fetching Locations (Business Information API).
2. **`mybusinessaccountmanagement.googleapis.com`**
   - Quotas for managing Accounts and Admins (Account Management API).
3. **`mybusinessverifications.googleapis.com`**
   - Quotas for triggering and completing location verifications (Verifications API).
4. **`mybusinessqanda.googleapis.com`**
   - Quotas for Questions & Answers.
5. **`mybusinesslodging.googleapis.com`**
   - Quotas for Hotel/Lodging attributes.
6. **`mybusinessplaceactions.googleapis.com`**
   - Quotas for managing Place Action links (e.g., ordering, reservations).
7. **`mybusiness.googleapis.com`**
   - The legacy master API, which is still heavily used behind the scenes for endpoints that haven't been fully migrated to granular APIs (like Reviews, Media, and Posts).

## Querying Generic Services

If Google releases a new API service that hasn't been added as a helper method yet, you can still query its quotas by passing the raw service string from the list above:

```typescript
const quotas = await client.quotas.get({
  projectId: 'your-project-id',
  service: 'mybusinessbusinessinformation.googleapis.com',
});
```

## Understanding the Response

The service returns a flattened and normalized array of all metrics and limits for that service. Limits that are "unlimited" will return `null`.

```json
{
  "projectId": "1234567890",
  "service": "mybusinessbusinessinformation.googleapis.com",
  "quotas": [
    {
      "metric": "mybusinessbusinessinformation.googleapis.com/create_location_requests",
      "displayName": "Create Location requests per day",
      "limit": 1000,
      "unit": "1/d"
    },
    {
      "metric": "mybusinessbusinessinformation.googleapis.com/update_location_requests",
      "displayName": "Update Location requests per day",
      "limit": 5000,
      "unit": "1/d"
    }
  ]
}
```
