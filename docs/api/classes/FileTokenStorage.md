[**@vitabletech/gbp-sdk**](../index.md)

***

## Implements

- [`TokenStorage`](../interfaces/TokenStorage.md)

## Constructors

### Constructor

> **new FileTokenStorage**(`filePath?`): `FileTokenStorage`

#### Parameters

##### filePath?

`string`

#### Returns

`FileTokenStorage`

## Methods

### clearTokens()

> **clearTokens**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TokenStorage`](../interfaces/TokenStorage.md).[`clearTokens`](../interfaces/TokenStorage.md#cleartokens)

***

### getRefreshToken()

> **getRefreshToken**(): `Promise`\<`string` \| `null`\>

#### Returns

`Promise`\<`string` \| `null`\>

#### Implementation of

[`TokenStorage`](../interfaces/TokenStorage.md).[`getRefreshToken`](../interfaces/TokenStorage.md#getrefreshtoken)

***

### getToken()

> **getToken**(): `Promise`\<`string` \| `null`\>

#### Returns

`Promise`\<`string` \| `null`\>

#### Implementation of

[`TokenStorage`](../interfaces/TokenStorage.md).[`getToken`](../interfaces/TokenStorage.md#gettoken)

***

### setRefreshToken()

> **setRefreshToken**(`token`): `Promise`\<`void`\>

#### Parameters

##### token

`string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TokenStorage`](../interfaces/TokenStorage.md).[`setRefreshToken`](../interfaces/TokenStorage.md#setrefreshtoken)

***

### setToken()

> **setToken**(`token`, `expiresInSeconds`): `Promise`\<`void`\>

#### Parameters

##### token

`string`

##### expiresInSeconds

`number`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TokenStorage`](../interfaces/TokenStorage.md).[`setToken`](../interfaces/TokenStorage.md#settoken)
