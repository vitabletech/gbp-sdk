# Media

## Introduction

The `MediaService` manages photos and videos for a Location. Google requires you to provide a publicly accessible URL of the media file when creating it.

You can access this service via `client.media`.

### Official Documentation

[Google Business Profile: Media API Reference](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.media)

---

## Methods

### `list(locationId, options)`

#### Purpose

Lists all media items associated with a location.

#### Syntax

```typescript
async client.media.list(locationId: string, options?: { pageToken?: string }): Promise<any>
```

### `get(locationId, mediaKey)`

#### Purpose

Gets specific information about a single media item.

#### Syntax

```typescript
async client.media.get(locationId: string, mediaKey: string): Promise<any>
```

### `create(accountId, locationId, data)`

#### Purpose

Uploads a new media item to the location using a source URL.

#### Syntax

```typescript
async client.media.create(accountId: string, locationId: string, data: any): Promise<any>
```

#### Request Example

```typescript
const accountId = 'accounts/123';
const locationId = '456';
const mediaData = {
  mediaFormat: 'PHOTO',
  locationAssociation: {
    category: 'COVER',
  },
  sourceUrl: 'https://www.example.com/images/storefront.jpg',
};

const newMedia = await client.media.create(accountId, locationId, mediaData);
console.log('Created media:', newMedia.name);
```

### `patch(accountId, locationId, mediaKey, data, updateMask?)`

#### Purpose

Updates metadata of the specified media item. Note that this can typically only be used to update the Category of a media item, and the new category cannot be COVER or PROFILE.

#### Syntax

```typescript
async client.media.patch(accountId: string, locationId: string, mediaKey: string, data: any, updateMask?: string): Promise<any>
```

#### Request Example

```typescript
const updatedMedia = await client.media.patch(
  'accounts/123',
  'locations/456',
  'media/789',
  {
    locationAssociation: {
      category: 'INTERIOR',
    },
  },
  'locationAssociation.category'
);
```

### `delete(locationId, mediaKey)`

#### Purpose

Deletes a media item from the location.

#### Syntax

```typescript
async client.media.delete(locationId: string, mediaKey: string): Promise<void>
```
