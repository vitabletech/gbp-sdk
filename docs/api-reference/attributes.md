---
description: 'The `AttributesService` allows you to retrieve, update, and manage the attributes (e.g. amenities, accessibility flags) associated with a location.'
---

# Attributes

## Introduction

The `AttributesService` allows you to manage the attributes (amenities, flags, specific URLs) associated with a location.
You can access this service via `client.attributes`.

### Official Documentation

[Google Business Profile: Attributes API Reference](https://developers.google.com/my-business/reference/businessinformation/rest/v1/attributes)

---

## Methods

### `list(options)`

#### Purpose

Returns the list of attributes that would be available for a location with the given primary category and region code.

#### Syntax

```typescript
async client.attributes.list(options: {
  categoryName: string;
  regionCode: string;
  languageCode?: string;
  showAll?: boolean;
  pageSize?: number;
  pageToken?: string;
  parent?: string;
}): Promise<any>
```

#### Request Example

```typescript
const attributes = await client.attributes.list({
  categoryName: 'gcid:gas_station',
  regionCode: 'IN',
  languageCode: 'EN',
});
console.log(attributes);
```

[Reference: attributes.list](https://developers.google.com/my-business/reference/businessinformation/rest/v1/attributes/list)

---

### `updateLocationAttributes(locationId, attributes)`

#### Purpose

Automatically prepares and updates the attributes for a given location. It takes an array of attributes and constructs the appropriate API payload and `attributeMask` under the hood.

#### Syntax

```typescript
async client.attributes.updateLocationAttributes(
  locationId: string,
  attributes: any[]
): Promise<any>
```

#### Request Example

```typescript
const attributesArray = [
  {
    name: 'attributes/is_owned_by_women',
    values: [true],
  },
  {
    name: 'attributes/has_onsite_services',
    values: [true],
  },
];

const result = await client.attributes.updateLocationAttributes(
  '5306572885782887525',
  attributesArray
);
```

[Reference: locations.attributes.patch](https://developers.google.com/my-business/reference/businessinformation/rest/v1/locations.attributes/patch)

---

### `updateWhatsAppUrl(locationId, whatsappUrl)`

#### Purpose

Specifically sets the WhatsApp URL for a location by updating the `attributes/url_whatsapp` attribute.

#### Syntax

```typescript
async client.attributes.updateWhatsAppUrl(
  locationId: string,
  whatsappUrl: string
): Promise<any>
```

#### Request Example

```typescript
const locationId = '5306572885782887525';
const whatsappUrl = 'https://wa.me/55555555';

const response = await client.attributes.updateWhatsAppUrl(
  locationId,
  whatsappUrl
);
```

[Reference: locations.attributes.patch](https://developers.google.com/my-business/reference/businessinformation/rest/v1/locations.attributes/patch)

---

### `updateFacebookUrl(locationId, url)`

### `updateInstagramUrl(locationId, url)`

### `updateLinkedInUrl(locationId, url)`

### `updatePinterestUrl(locationId, url)`

### `updateTextMessagingUrl(locationId, url)`

### `updateTikTokUrl(locationId, url)`

### `updateTwitterUrl(locationId, url)`

### `updateYouTubeUrl(locationId, url)`

### `updatePreferredMessagingService(locationId, service)`

#### Purpose

Specifically sets various social URL attributes or the preferred messaging service for a location (e.g. `attributes/url_facebook`, `attributes/preferred_messaging_service`).

#### Syntax

```typescript
async client.attributes.updateFacebookUrl(locationId: string, url: string): Promise<any>
// (Same syntax applies for the other social URL methods)
```

#### Request Example

```typescript
const locationId = '5306572885782887525';

await client.attributes.updateFacebookUrl(
  locationId,
  'https://www.facebook.com/msrajawat298'
);
await client.attributes.updatePreferredMessagingService(locationId, 'whatsapp');
```

[Reference: locations.attributes.patch](https://developers.google.com/my-business/reference/businessinformation/rest/v1/locations.attributes/patch)
