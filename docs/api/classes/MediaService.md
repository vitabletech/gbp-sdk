[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new MediaService**(`client`): `MediaService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`MediaService`

## Methods

### bulkCreate()

> **bulkCreate**(`accountId`, `locationId`, `mediaItems`): `Promise`\<`any`[]\>

Uploads multiple media items for a location concurrently.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### mediaItems

`any`[]

#### Returns

`Promise`\<`any`[]\>

---

### create()

> **create**(`accountId`, `locationId`, `data`): `Promise`\<`any`>>\>

Creates/Uploads a new media item for a location.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### data

`any`

#### Returns

`Promise`\<`any`\>

---

### delete()

> **delete**(`accountId`, `locationId`, `mediaKey`): `Promise`\<`void`>>\>

Deletes a media item.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### mediaKey

`string`

#### Returns

`Promise`\<`void`\>

---

### get()

> **get**(`accountId`, `locationId`, `mediaKey`): `Promise`\<`any`>>\>

Gets a specific media item.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### mediaKey

`string`

#### Returns

`Promise`\<`any`\>

---

### list()

> **list**(`accountId`, `locationId`, `options?`): `Promise`\<`any`>>\>

Lists all media items for a location.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### options?

###### pageToken?

`string`

#### Returns

`Promise`\<`any`\>

---

### patch()

> **patch**(`accountId`, `locationId`, `mediaKey`, `data`, `updateMask?`): `Promise`\<`any`>>\>

Updates metadata of the specified media item.
Note: This can only be used to update the Category of a media item, with the exception that the new category cannot be COVER or PROFILE.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### mediaKey

`string`

##### data

`any`

##### updateMask?

`string`

The specific fields to update. e.g. "locationAssociation.category"

#### Returns

`Promise`\<`any`\>
