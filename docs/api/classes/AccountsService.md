[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new AccountsService**(`client`): `AccountsService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`AccountsService`

## Methods

### get()

> **get**(`accountId`): `Promise`\<`any`>>\>

Gets a specific account by ID.

#### Parameters

##### accountId

`string`

#### Returns

`Promise`\<`any`\>

---

### list()

> **list**(`options?`): `Promise`\<`any`>>\>

Lists all Google Business Profile accounts for the authenticated user.

#### Parameters

##### options?

###### pageToken?

`string`

#### Returns

`Promise`\<`any`\>

---

### listAll()

> **listAll**(): `Promise`\<`any`[]\>

Automatically fetches all accounts, handling pagination internally.

#### Returns

`Promise`\<`any`[]\>
