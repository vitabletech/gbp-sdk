import { GBPClient, ConsoleLogger } from '@vitabletech/gbp-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Examples for AccountsService
 * Run with: npx tsx examples/accounts.ts
 */
async function run() {
  const client = new GBPClient({
    clientId: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN || 'your-refresh-token',
    logger: new ConsoleLogger(),
    tokenStorage: 'file'
  });

  try {
    console.log('\n--- 1. listAll() ---');
    // Automatically handles pagination and returns all accounts
    const allAccounts = await client.accounts.listAll();
    console.log(`Found ${allAccounts.length} accounts total.`);
    allAccounts.forEach(account => {
      console.log(`- ${account.accountName} (${account.name})`);
    });

    if (allAccounts.length > 0) {
      const firstAccountId = allAccounts[0].name.split('/')[1];

      console.log('\n--- 2. get() ---');
      // Fetches a specific account by ID
      const singleAccount = await client.accounts.get(firstAccountId);
      console.log('Account Details:', singleAccount.accountName);
    }

    console.log('\n--- 3. list() ---');
    // Manually fetch a paginated chunk
    const paginatedResponse = await client.accounts.list({ pageToken: undefined });
    console.log(`Found ${paginatedResponse.accounts?.length || 0} accounts in the first page.`);
    if (paginatedResponse.nextPageToken) {
      console.log(`Next page token: ${paginatedResponse.nextPageToken}`);
    }

  } catch (error) {
    console.error('Failed to run Accounts examples:', error);
  }
}

run();
