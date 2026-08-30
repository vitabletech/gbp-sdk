---
title: 'TokenManager'
description: 'API Reference documentation for TokenManager in the @vitabletech/gbp-sdk.'
---

[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new TokenManager**(`config`): `TokenManager`

#### Parameters

##### config

[`GBPClientConfig`](../interfaces/GBPClientConfig.md)

#### Returns

`TokenManager`

## Methods

### clearTokens()

> **clearTokens**(): `Promise`\<`void`>\>

#### Returns

`Promise`\<`void`\>

---

### getAccessToken()

> **getAccessToken**(): `Promise`\<`string`>\>

#### Returns

`Promise`\<`string`\>

---

### getOAuthClient()

> **getOAuthClient**(): [`OAuthClient`](OAuthClient.md)

#### Returns

[`OAuthClient`](OAuthClient.md)

---

### getTokenInfo()

> **getTokenInfo**(): `Promise`\<`any`>\>

#### Returns

`Promise`\<`any`\>

---

### processAuthCode()

> **processAuthCode**(`code`): `Promise`\<`void`>\>

#### Parameters

##### code

`string`

#### Returns

`Promise`\<`void`\>
