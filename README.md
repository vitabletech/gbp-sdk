# @vitabletech/gbp-sdk

Enterprise-grade Google Business Profile (GBP) SDK for Node.js.

## Features

- **Automatic Token Management**: Automatically handles refreshing access tokens when they expire. Thread-safe to prevent duplicate refresh requests.
- **Pluggable Token Storage**: Supports memory, file, and custom token storage implementations (e.g. Redis).
- **Robust HTTP Client**: Built-in exponential backoff, retry logic for 429 and 5xx errors, and rate limit handling.
- **Auto-Pagination**: Provides `listAll` methods to automatically traverse `nextPageToken` and fetch all records.
- **Strong Typing**: Full TypeScript support with generics.
- **Generic Requests**: Exposes a `request()` method for unsupported or newly released Google APIs.

## Installation

```bash
npm install @vitabletech/gbp-sdk
```

## Quick Start

```typescript
import { GBPClient, ConsoleLogger } from '@vitabletech/gbp-sdk';

const client = new GBPClient({
  clientId: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  refreshToken: 'YOUR_REFRESH_TOKEN',
  tokenStorage: 'file', // stores tokens in gbp-tokens.json
  logger: new ConsoleLogger(), // optional pluggable logger
});

async function main() {
  // Automatically handles token generation and pagination!
  const accounts = await client.accounts.listAll();

  if (accounts.length > 0) {
    const accountName = accounts[0].name;
    const locations = await client.locations.listAll(accountName);

    console.log(`Found ${locations.length} locations for ${accountName}`);
  }
}

main();
```

### Creating a Location Example Payload

When using `client.locations.create()`, you must pass a valid location object. Here is an example of a complete payload:

```json
{
  "languageCode": "en",
  "title": "MAA ANJANI PETROLEUM SERVICE",
  "storeCode": "179280",
  "phoneNumbers": {
    "primaryPhone": "+919782835399"
  },
  "categories": {
    "primaryCategory": {
      "name": "categories/gcid:gas_station"
    }
  },
  "storefrontAddress": {
    "regionCode": "IN",
    "postalCode": "307514",
    "administrativeArea": "Rajasthan",
    "locality": "Udaipur",
    "addressLines": ["BHARAT PETROLEUM DEALERS", "V&PO BHATANA"]
  },
  "latlng": {
    "latitude": 24.521721,
    "longitude": 72.519443
  },
  "websiteUri": "https://www.bharatpetroleum.in",
  "regularHours": {
    "periods": [
      {
        "openDay": "MONDAY",
        "openTime": { "hours": 6, "minutes": 0 },
        "closeDay": "MONDAY",
        "closeTime": { "hours": 22, "minutes": 0 }
      },
      {
        "openDay": "TUESDAY",
        "openTime": { "hours": 6, "minutes": 0 },
        "closeDay": "TUESDAY",
        "closeTime": { "hours": 22, "minutes": 0 }
      },
      {
        "openDay": "WEDNESDAY",
        "openTime": { "hours": 6, "minutes": 0 },
        "closeDay": "WEDNESDAY",
        "closeTime": { "hours": 22, "minutes": 0 }
      },
      {
        "openDay": "THURSDAY",
        "openTime": { "hours": 6, "minutes": 0 },
        "closeDay": "THURSDAY",
        "closeTime": { "hours": 22, "minutes": 0 }
      },
      {
        "openDay": "FRIDAY",
        "openTime": { "hours": 6, "minutes": 0 },
        "closeDay": "FRIDAY",
        "closeTime": { "hours": 22, "minutes": 0 }
      },
      {
        "openDay": "SATURDAY",
        "openTime": { "hours": 6, "minutes": 0 },
        "closeDay": "SATURDAY",
        "closeTime": { "hours": 22, "minutes": 0 }
      },
      {
        "openDay": "SUNDAY",
        "openTime": { "hours": 6, "minutes": 0 },
        "closeDay": "SUNDAY",
        "closeTime": { "hours": 22, "minutes": 0 }
      }
    ]
  },
  "profile": {
    "description": "Bharat Petroleum retail outlet."
  }
}
```

## Generic Request Mechanism

You can use the generic `request()` method to interact with endpoints not yet natively wrapped by the SDK:

```typescript
const response = await client.request({
  method: 'GET',
  url: 'https://oauth2.googleapis.com/tokeninfo',
  query: {
    access_token: 'YOUR_ACCESS_TOKEN',
  },
});
```
