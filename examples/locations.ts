import { GBPClient, ConsoleLogger } from '@vitabletech/gbp-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Examples for LocationsService
 * Run with: npx tsx examples/locations.ts
 */
async function run() {
  const client = new GBPClient({
    clientId: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN || 'your-refresh-token',
    logger: new ConsoleLogger(),
    tokenStorage: 'file'
  });

  const accountId = '111222333'; // Replace with a real account ID
  const testLocationId = '444555666'; // Replace with a real location ID
  let newLocationId: string | undefined;

  try {
    console.log('\n--- 1. create() ---');
    // Creates a new location (using validateOnly to avoid polluting your account during tests)
    const newLocation = await client.locations.create(accountId, {
      languageCode: "en",
      title: "Test Vitabletech SDK Location",
      storeCode: "TEST-01",
      phoneNumbers: {
        primaryPhone: "+919876543210"
      },
      categories: {
        primaryCategory: { name: "categories/gcid:software_company" }
      },
      storefrontAddress: {
        regionCode: "IN",
        postalCode: "302001",
        administrativeArea: "Rajasthan",
        locality: "Jaipur",
        addressLines: ["Software Park", "C-Scheme"]
      },
      latlng: {
        latitude: 26.9124,
        longitude: 75.7873
      }
    }, { validateOnly: true }); 
    
    console.log('Location creation validated successfully!');
    // In a real scenario (validateOnly: false), you would grab the ID:
    // newLocationId = newLocation.name.split('/')[3];

    console.log('\n--- 2. listAll() ---');
    // Fetch all locations for the account
    const allLocations = await client.locations.listAll(accountId);
    console.log(`Found ${allLocations.length} locations total.`);

    console.log('\n--- 3. list() ---');
    // Fetch paginated locations with custom readMask
    const paginated = await client.locations.list(accountId, { 
      readMask: 'name,title,storeCode',
      pageToken: undefined
    });
    console.log(`First page has ${paginated.locations?.length || 0} locations.`);

    console.log('\n--- 4. get() ---');
    // Get a specific location
    const location = await client.locations.get(testLocationId);
    console.log(`Fetched Location: ${location.title}`);

    console.log('\n--- 5. patch() ---');
    // Update the location's title
    const updatedLocation = await client.locations.patch(testLocationId, {
      title: "Updated Title SDK"
    }, "title");
    console.log(`Location updated. New title: ${updatedLocation.title}`);

    console.log('\n--- 6. delete() ---');
    // Note: Deleting a location cannot be undone. We have commented this out for safety.
    // await client.locations.delete(testLocationId);
    console.log(`Delete skipped for safety.`);

  } catch (error) {
    console.error('Failed to run Locations examples:', error);
  }
}

run();
