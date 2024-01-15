# Quick Start

This guide will help you instantiate the SDK and make your first successful API call to fetch all Google Business Profile Accounts.

## 1. Get Your Credentials

You will need an OAuth 2.0 Client ID, Client Secret, and a valid Refresh Token that has been granted the `https://www.googleapis.com/auth/business.manage` scope.

If you don't have a refresh token yet, please follow our [Authentication Guide](/getting-started/authentication) to generate one using the SDK.

## 2. Initialize the Client

Import the `GBPClient` and provide your credentials. The SDK automatically manages the OAuth lifecycle and token refresh process for you.

```typescript
import { GBPClient, ConsoleLogger } from '@vitabletech/gbp-sdk';

const client = new GBPClient({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  
  // Choose how tokens are stored between restarts. 
  // 'file' stores them in a local gbp-tokens.json file.
  tokenStorage: 'file',
  
  // (Optional) Logs underlying HTTP requests and SDK operations
  logger: new ConsoleLogger() 
});
```

## 3. Make Your First Call

The `accounts.listAll()` method automatically handles pagination and returns a strongly typed array of all accounts accessible by the authenticated user.

```typescript
async function fetchAccounts() {
  try {
    const accounts = await client.accounts.listAll();
    console.log(`Successfully fetched ${accounts.length} accounts!`);
    
    accounts.forEach(account => {
      console.log(`- ${account.accountName} (${account.name})`);
    });
    
  } catch (error) {
    console.error('Failed to fetch accounts:', error);
  }
}

fetchAccounts();
```

## Next Steps
Now that you have fetched your Accounts, you can use the account `name` property to start fetching [Locations](/api-reference/locations) and [Reviews](/api-reference/reviews).
