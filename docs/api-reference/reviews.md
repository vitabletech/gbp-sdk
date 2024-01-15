# Reviews

## Introduction
The `ReviewsService` allows you to manage customer reviews for a specific Location. You can fetch all reviews, get a single review by its ID, and importantly, reply to reviews programmatically.

You can access this service via `client.reviews`.

### Official Documentation
[Google Business Profile: Reviews API Reference](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews)

---

## Methods

### `listAll(parent)`

#### Purpose
Fetches all reviews for a specific location. This method automatically paginates through all results, handling `pageToken` behind the scenes.

#### Syntax
```typescript
async client.reviews.listAll(parent: string): Promise<Review[]>
```

#### Parameters
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `parent` | `string` | Yes | The name of the location to fetch reviews for (e.g. `accounts/123/locations/456`) |

#### Request Example
```typescript
const locationName = 'accounts/111222333/locations/444555';
const reviews = await client.reviews.listAll(locationName);

for (const review of reviews) {
  console.log(`Rating: ${review.starRating}`);
  console.log(`Comment: ${review.comment}`);
}
```

#### Expected Response
Returns an array of `Review` objects.
```json
[
  {
    "name": "accounts/111/locations/444/reviews/777",
    "reviewId": "777",
    "reviewer": {
      "displayName": "John Doe"
    },
    "starRating": "FIVE",
    "comment": "Excellent service!",
    "createTime": "2026-06-27T10:00:00.000Z",
    "updateTime": "2026-06-27T10:00:00.000Z"
  }
]
```

### `reply(name, comment)`

#### Purpose
Posts a response to a customer's review on behalf of the business. If a response already exists, this will overwrite it.

#### Syntax
```typescript
async client.reviews.reply(name: string, comment: string): Promise<ReviewReply>
```

#### Parameters
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | Yes | The full resource name of the review (e.g. `accounts/123/locations/456/reviews/789`) |
| `comment` | `string` | Yes | The text of the response (max 4096 characters) |

#### Request Example
```typescript
const reviewName = 'accounts/111/locations/444/reviews/777';
const replyText = 'Thank you so much for your kind words, John!';

const reply = await client.reviews.reply(reviewName, replyText);
console.log('Reply posted at:', reply.updateTime);
```

### `list(locationId, options)`

#### Purpose
Manually fetch a paginated chunk of reviews.

#### Syntax
```typescript
async client.reviews.list(locationId: string, options?: { pageToken?: string }): Promise<any>
```

### `get(locationId, reviewId)`

#### Purpose
Fetches a specific review by its ID.

#### Syntax
```typescript
async client.reviews.get(locationId: string, reviewId: string): Promise<any>
```

### `deleteReply(locationId, reviewId)`

#### Purpose
Deletes an existing reply to a review.

#### Syntax
```typescript
async client.reviews.deleteReply(locationId: string, reviewId: string): Promise<void>
```
