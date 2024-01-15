# Auto Pagination

When working with APIs that return potentially thousands of records (like fetching all reviews for a popular restaurant), Google requires you to paginate your requests. They return a `nextPageToken` string which you must manually append to the next HTTP request, looping until the token is empty.

This is tedious and error-prone. The `@vitabletech/gbp-sdk` abstracts this away entirely.

## Using `listAll`

For every service that returns a list of resources, the SDK exposes a `listAll()` method. This method internally handles the `pageToken` loop and returns a flattened, strongly-typed array containing **all** resources.

```typescript
// Automatically fetches page 1, 2, 3... and concatenates the results!
const allReviews = await client.reviews.listAll('accounts/123/locations/456');

console.log(`Successfully fetched all ${allReviews.length} reviews.`);
```

### When to use `listAll()`
- You need the complete dataset for a background job, reporting, or analytics.
- The total number of expected records is reasonable (e.g., < 10,000) and won't exhaust your Node.js server RAM.

## Manual Pagination (`list`)

If you are building a UI where you only want to show 10 records at a time, or if you are processing massive amounts of data that would crash your server if loaded into memory all at once, you should use the manual `list()` method.

```typescript
let pageToken: string | undefined = undefined;

do {
  // Pass the pageToken in the request parameters
  const response = await client.reviews.list({
    parent: 'accounts/123/locations/456',
    pageSize: 50,
    pageToken: pageToken
  });

  // Process the chunk of 50 reviews
  for (const review of response.reviews || []) {
    await saveToDatabase(review);
  }

  // Update the token for the next iteration
  pageToken = response.nextPageToken;
  
} while (pageToken);
```

By providing both `listAll()` and `list()`, the SDK gives you the convenience of auto-pagination and the fine-grained control of manual pagination when you need it.
