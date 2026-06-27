[**@vitabletech/gbp-sdk**](../index.md)

***

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new CursorPaginator**\<`T`\>(`client`, `endpoint`, `itemsKey`, `queryParams?`): `CursorPaginator`\<`T`\>

#### Parameters

##### client

`HttpClient`

##### endpoint

`string`

##### itemsKey

`string`

##### queryParams?

`Record`\<`string`, `any`\> = `{}`

#### Returns

`CursorPaginator`\<`T`\>

## Properties

### hasMore

> **hasMore**: `boolean` = `true`

***

### pageToken?

> `optional` **pageToken?**: `string`

## Methods

### next()

> **next**(): `Promise`\<`T`[]\>

Fetches the next page of results.
Returns an empty array if there are no more results.

#### Returns

`Promise`\<`T`[]\>
