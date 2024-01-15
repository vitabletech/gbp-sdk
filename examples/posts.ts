import { GBPClient, ConsoleLogger } from '@vitabletech/gbp-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Examples for PostsService
 * Run with: npx tsx examples/posts.ts
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
  const testPostId = '111222333'; // Replace with a real post ID

  try {
    console.log('\n--- 1. create() ---');
    // Create a new Local Post on Google Search/Maps
    const newPost = await client.posts.create(locationId, {
      languageCode: 'en',
      summary: 'We are running a weekend sale! 20% off all items.',
      callToAction: {
        actionType: 'LEARN_MORE',
        url: 'https://example.com/sale'
      },
      topicType: 'STANDARD'
    });
    console.log(`Successfully created post! ID: ${newPost.name}`);

    console.log('\n--- 2. list() ---');
    // Fetch a list of all posts for the location
    const postsResponse = await client.posts.list(locationId, {
      pageToken: undefined
    });
    console.log(`Found ${postsResponse.localPosts?.length || 0} posts.`);
    
    postsResponse.localPosts?.forEach((post: any) => {
      console.log(`- ${post.name} (${post.state})`);
    });

    console.log('\n--- 3. get() ---');
    // Get a specific post by ID
    const singlePost = await client.posts.get(locationId, testPostId);
    console.log(`Post Summary: ${singlePost.summary}`);

    console.log('\n--- 4. patch() ---');
    // Update the post's summary
    const updatedPost = await client.posts.patch(locationId, testPostId, {
      summary: "Updated: 30% off this weekend only!"
    }, "summary");
    console.log(`Successfully updated post! New summary: ${updatedPost.summary}`);

    console.log('\n--- 5. delete() ---');
    // Note: Deleting a post cannot be undone. Commented out for safety.
    // await client.posts.delete(locationId, testPostId);
    console.log(`Delete skipped for safety.`);

  } catch (error) {
    console.error('Failed to run Posts examples:', error);
  }
}

run();
