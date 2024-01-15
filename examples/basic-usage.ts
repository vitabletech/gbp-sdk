import { GBPClient, ConsoleLogger } from '../src';

async function main() {
  const client = new GBPClient({
    clientId: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN || 'your-refresh-token',
    tokenStorage: 'file',
    logger: new ConsoleLogger(),
  });

  try {
    console.log('Fetching accounts...');
    const accounts = await client.accounts.listAll();
    console.log('Accounts:', accounts.length);

    if (accounts.length > 0) {
      const firstAccountName = accounts[0].name;
      console.log(`Fetching locations for account: ${firstAccountName}`);
      
      const locations = await client.locations.listAll(firstAccountName);
      console.log('Locations:', locations.length);

      if (locations.length > 0) {
        const firstLocationName = locations[0].name;
        console.log(`Fetching reviews for location: ${firstLocationName}`);
        
        const reviews = await client.reviews.listAll(firstLocationName);
        console.log('Reviews:', reviews.length);
      }
    }
  } catch (error) {
    console.error('Error in basic usage example:', error);
  }
}

// Check if we have credentials before running
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_REFRESH_TOKEN) {
  main();
} else {
  console.log('Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN environment variables to run this example.');
}
