import { GBPClient, ConsoleLogger } from '@vitabletech/gbp-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Examples for MediaService
 * Run with: npx tsx examples/media.ts
 */
async function run() {
  const client = new GBPClient({
    clientId: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN || 'your-refresh-token',
    logger: new ConsoleLogger(),
    tokenStorage: 'file'
  });

  const locationId = 'accounts/123/locations/456'; // Replace with a real location ID
  const testMediaKey = '111222333'; // Replace with a real media key

  try {
    console.log('\n--- 1. create() ---');
    // Upload a new photo via URL
    const newMedia = await client.media.create(locationId, {
      mediaFormat: 'PHOTO',
      locationAssociation: {
        category: 'COVER' // Identifies this image as the cover photo
      },
      sourceUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000' 
    });
    console.log(`Successfully attached media! Name: ${newMedia.name}`);

    console.log('\n--- 2. list() ---');
    // Fetch a list of all media for the location
    const mediaResponse = await client.media.list(locationId, {
      pageToken: undefined
    });
    console.log(`Found ${mediaResponse.mediaItems?.length || 0} media items.`);
    
    mediaResponse.mediaItems?.forEach((item: any) => {
      console.log(`- ${item.name} (${item.mediaFormat})`);
    });

    console.log('\n--- 3. get() ---');
    // Get a specific media item
    const mediaItem = await client.media.get(locationId, testMediaKey);
    console.log(`Media Item Source: ${mediaItem.sourceUrl}`);

    console.log('\n--- 4. delete() ---');
    // Note: Deleting media cannot be undone. Commented out for safety.
    // await client.media.delete(locationId, testMediaKey);
    console.log(`Delete skipped for safety.`);

  } catch (error) {
    console.error('Failed to run Media examples:', error);
  }
}

run();
