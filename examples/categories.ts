import { GBPClient, ConsoleLogger } from '@vitabletech/gbp-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Examples for CategoriesService
 * Run with: npx tsx examples/categories.ts
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
    console.log('\n--- 1. list() ---');
    // Fetch a list of supported Google categories
    const categoriesResponse = await client.categories.list({
      languageCode: 'en',
      view: 'BASIC'
    });
    console.log(`Found ${categoriesResponse.categories?.length || 0} categories.`);
    
    if (categoriesResponse.categories?.length > 0) {
      console.log(`Example category: ${categoriesResponse.categories[0].displayName}`);
    }

    console.log('\n--- 2. search() ---');
    // Search for a specific category type (Useful for Autocomplete UIs)
    const searchResponse = await client.categories.search({
      searchTerm: 'Restaurant',
      languageCode: 'en',
      regionCode: 'US'
    });
    console.log(`Found ${searchResponse.categories?.length || 0} matching categories.`);
    
    searchResponse.categories?.forEach((category: any) => {
      console.log(`- ${category.displayName} (${category.name})`);
    });

  } catch (error) {
    console.error('Failed to run Categories examples:', error);
  }
}

run();
