[**@vitabletech/gbp-sdk**](../index.md)

***

## Constructors

### Constructor

> **new GBPClient**(`config`): `GBPClient`

#### Parameters

##### config

[`GBPClientConfig`](../interfaces/GBPClientConfig.md)

#### Returns

`GBPClient`

## Properties

### accounts

> **accounts**: `AccountsService`

***

### categories

> **categories**: `CategoriesService`

***

### locations

> **locations**: `LocationsService`

***

### media

> **media**: `MediaService`

***

### posts

> **posts**: `PostsService`

***

### reviews

> **reviews**: `ReviewsService`

## Methods

### getAuthorizationUrl()

> **getAuthorizationUrl**(`scopes`, `state?`): `string`

Generates the OAuth 2.0 authorization URL for user consent.

#### Parameters

##### scopes

`string`[]

##### state?

`string`

#### Returns

`string`

***

### getTokenInfo()

> **getTokenInfo**(): `Promise`\<`any`\>

Retrieves information about the current access token, such as its expiration time, scopes, and app ID.

#### Returns

`Promise`\<`any`\>

***

### processAuthCode()

> **processAuthCode**(`code`): `Promise`\<`void`\>

Processes an OAuth 2.0 authorization code to fetch and store tokens.

#### Parameters

##### code

`string`

#### Returns

`Promise`\<`void`\>

***

### request()

> **request**\<`T`\>(`options`): `Promise`\<`T`\>

Generic request method for unsupported or custom API endpoints.
This allows developers to use newly released Google APIs immediately.

#### Type Parameters

##### T

`T` = `any`

#### Parameters

##### options

[`RequestOptions`](../interfaces/RequestOptions.md)

Request options including url, method, query, body, etc.

#### Returns

`Promise`\<`T`\>

The parsed JSON response or raw text.
