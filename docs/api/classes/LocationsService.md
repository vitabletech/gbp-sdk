[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new LocationsService**(`client`): `LocationsService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`LocationsService`

## Methods

### create()

> **create**(`accountId`, `data`, `options?`): `Promise`\<`any`>\>

Creates a new location.

#### Parameters

##### accountId

`string`

##### data

`any`

##### options?

###### requestId?

`string`

###### validateOnly?

`boolean`

#### Returns

`Promise`\<`any`\>

---

### delete()

> **delete**(`locationId`): `Promise`\<`void`>\>

Deletes a location.

#### Parameters

##### locationId

`string`

#### Returns

`Promise`\<`void`\>

---

### get()

> **get**(`locationId`, `options?`): `Promise`\<`any`>\>

Gets a specific location by ID.

#### Parameters

##### locationId

`string`

##### options?

###### readMask?

`string`

#### Returns

`Promise`\<`any`\>

---

### getAttributes()

> **getAttributes**(`locationId`): `Promise`\<`any`>\>

Gets attributes for a location.

#### Parameters

##### locationId

`string`

#### Returns

`Promise`\<`any`\>

---

### getMetadata()

> **getMetadata**(`locationId`): `Promise`\<`any`>\>

Retrieves metadata for a location.

#### Parameters

##### locationId

`string`

#### Returns

`Promise`\<`any`\>

---

### getServiceItems()

> **getServiceItems**(`locationId`): `Promise`\<`any`>\>

Retrieves service items for a location.

#### Parameters

##### locationId

`string`

#### Returns

`Promise`\<`any`\>

---

### list()

> **list**(`accountId`, `options?`): `Promise`\<`any`>\>

Lists all locations for a specific account.

#### Parameters

##### accountId

`string`

##### options?

###### pageToken?

`string`

###### readMask?

`string`

#### Returns

`Promise`\<`any`\>

---

### listAll()

> **listAll**(`accountId`, `readMask?`): `Promise`\<`any`[]\>

Automatically fetches all locations for an account.

#### Parameters

##### accountId

`string`

##### readMask?

`string` = `'name,title,storeCode,websiteUri,phoneNumbers,regularHours'`

#### Returns

`Promise`\<`any`[]\>

---

### listPaginator()

> **listPaginator**(`accountId`, `options?`): [`CursorPaginator`](CursorPaginator.md)\<`any`>\>

Returns a paginator object to manually fetch locations page by page.

#### Parameters

##### accountId

`string`

##### options?

###### pageSize?

`number`

###### readMask?

`string`

#### Returns

[`CursorPaginator`](CursorPaginator.md)\<`any`\>

---

### patch()

> **patch**(`locationId`, `data`, `updateMask`): `Promise`\<`any`>\>

Updates an existing location.

#### Parameters

##### locationId

`string`

##### data

`any`

##### updateMask

`string`

#### Returns

`Promise`\<`any`\>

---

### patchAttributes()

> **patchAttributes**(`locationId`, `data`, `attributeMask`): `Promise`\<`any`>\>

Updates attributes for a location.

#### Parameters

##### locationId

`string`

##### data

`any`

##### attributeMask

`string`

#### Returns

`Promise`\<`any`\>

---

### updateServiceItems()

> **updateServiceItems**(`locationId`, `serviceItems`): `Promise`\<`any`>\>

Updates service items for a location.

#### Parameters

##### locationId

`string`

##### serviceItems

`any`[]

#### Returns

`Promise`\<`any`\>
