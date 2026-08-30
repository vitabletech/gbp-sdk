---
title: 'PostsService'
description: 'API Reference documentation for PostsService in the @vitabletech/gbp-sdk.'
---

[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new PostsService**(`client`): `PostsService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`PostsService`

## Methods

### create()

> **create**(`locationId`, `data`): `Promise`\<`any`>\>

Creates a new local post.

#### Parameters

##### locationId

`string`

##### data

`any`

#### Returns

`Promise`\<`any`\>

---

### delete()

> **delete**(`locationId`, `localPostId`): `Promise`\<`void`>\>

Deletes a local post.

#### Parameters

##### locationId

`string`

##### localPostId

`string`

#### Returns

`Promise`\<`void`\>

---

### get()

> **get**(`locationId`, `localPostId`): `Promise`\<`any`>\>

Gets a specific local post.

#### Parameters

##### locationId

`string`

##### localPostId

`string`

#### Returns

`Promise`\<`any`\>

---

### list()

> **list**(`locationId`, `options?`): `Promise`\<`any`>\>

Lists all local posts for a location.

#### Parameters

##### locationId

`string`

##### options?

###### pageToken?

`string`

#### Returns

`Promise`\<`any`\>

---

### patch()

> **patch**(`locationId`, `localPostId`, `data`, `updateMask`): `Promise`\<`any`>\>

Updates an existing local post.

#### Parameters

##### locationId

`string`

##### localPostId

`string`

##### data

`any`

##### updateMask

`string`

#### Returns

`Promise`\<`any`\>
