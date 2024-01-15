import { GBPClient, ConsoleLogger } from '@vitabletech/gbp-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Examples for ReviewsService
 * Run with: npx tsx examples/reviews.ts
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
  const testReviewId = '789'; // Replace with a real review ID

  try {
    console.log('\n--- 1. listAll() ---');
    // Automatically handles pagination and returns all reviews for a location
    const allReviews = await client.reviews.listAll(locationId);
    console.log(`Found ${allReviews.length} reviews total.`);

    console.log('\n--- 2. list() ---');
    // Manually fetch a paginated chunk
    const paginatedResponse = await client.reviews.list(locationId, { pageToken: undefined });
    console.log(`Found ${paginatedResponse.reviews?.length || 0} reviews in the first page.`);

    console.log('\n--- 3. get() ---');
    // Get a specific review
    const review = await client.reviews.get(locationId, testReviewId);
    console.log(`Review Rating: ${review.starRating}`);
    console.log(`Review Comment: ${review.comment}`);

    console.log('\n--- 4. reply() ---');
    // Reply to a customer's review
    const reply = await client.reviews.reply(locationId, testReviewId, {
      comment: "Thank you for your wonderful feedback! We hope to see you again soon."
    });
    console.log(`Reply posted successfully at ${reply.updateTime}`);

    console.log('\n--- 5. deleteReply() ---');
    // Note: Deleting a reply cannot be undone. Commented out for safety.
    // await client.reviews.deleteReply(locationId, testReviewId);
    console.log(`Delete reply skipped for safety.`);

  } catch (error) {
    console.error('Failed to run Reviews examples:', error);
  }
}

run();
