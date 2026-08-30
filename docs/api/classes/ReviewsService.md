---
title: 'ReviewsService'
description: 'API Reference documentation for ReviewsService in the @vitabletech/gbp-sdk.'
---

[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new ReviewsService**(`client`): `ReviewsService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`ReviewsService`

## Methods

### deleteReply()

> **deleteReply**(`accountId`, `locationId`, `reviewId`): `Promise`\<`void`>\>

Deletes a reply to a review.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### reviewId

`string`

#### Returns

`Promise`\<`void`\>

---

### get()

> **get**(`accountId`, `locationId`, `reviewId`): `Promise`\<`any`>\>

Gets a specific review by ID.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### reviewId

`string`

#### Returns

`Promise`\<`any`\>

---

### list()

> **list**(`accountId`, `locationId`, `options?`): `Promise`\<`any`>\>

Lists all reviews for a location.

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

### listAll()

> **listAll**(`accountId`, `locationId`): `Promise`\<`any`[]\>

Automatically fetches all reviews for a location.

#### Parameters

##### accountId

`string`

##### locationId

`string`

#### Returns

`Promise`\<`any`[]\>

---

### listPaginator()

> **listPaginator**(`accountId`, `locationId`, `options?`): [`CursorPaginator`](CursorPaginator.md)\<`any`>\>

Returns a paginator object to manually fetch reviews page by page.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### options?

###### pageSize?

`number`

#### Returns

[`CursorPaginator`](CursorPaginator.md)\<`any`\>

---

### reply()

> **reply**(`accountId`, `locationId`, `reviewId`, `reply`): `Promise`\<`any`>\>

Replies to a review.

#### Parameters

##### accountId

`string`

##### locationId

`string`

##### reviewId

`string`

##### reply

###### comment

`string`

#### Returns

`Promise`\<`any`\>
