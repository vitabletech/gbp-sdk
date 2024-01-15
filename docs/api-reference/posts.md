# Posts

## Introduction
The `PostsService` manages Local Posts (like Events, Offers, or Updates) that appear on a business's Google Search and Maps listing.

You can access this service via `client.posts`.

### Official Documentation
[Google Business Profile: Local Posts API Reference](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.localPosts)

---

## Methods

### `list(locationId, options)`

#### Purpose
Lists all local posts associated with a location.

#### Syntax
```typescript
async client.posts.list(locationId: string, options?: { pageToken?: string }): Promise<any>
```

### `get(locationId, localPostId)`

#### Purpose
Gets a specific local post by its ID.

#### Syntax
```typescript
async client.posts.get(locationId: string, localPostId: string): Promise<any>
```

### `create(locationId, data)`

#### Purpose
Creates a new local post on the location.

#### Syntax
```typescript
async client.posts.create(locationId: string, data: any): Promise<any>
```

#### Request Example
```typescript
const locationId = 'accounts/123/locations/456';
const postData = {
  languageCode: 'en',
  summary: 'We are running a weekend sale! 20% off all items.',
  callToAction: {
    actionType: 'LEARN_MORE',
    url: 'https://example.com/sale'
  }
};

const newPost = await client.posts.create(locationId, postData);
console.log('Created post:', newPost.name);
```

### `patch(locationId, localPostId, data, updateMask)`

#### Purpose
Updates an existing local post.

#### Syntax
```typescript
async client.posts.patch(locationId: string, localPostId: string, data: any, updateMask: string): Promise<any>
```

### `delete(locationId, localPostId)`

#### Purpose
Deletes a local post.

#### Syntax
```typescript
async client.posts.delete(locationId: string, localPostId: string): Promise<void>
```
