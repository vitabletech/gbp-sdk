[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new OAuthClient**(`config`): `OAuthClient`

#### Parameters

##### config

[`GBPClientConfig`](../interfaces/GBPClientConfig.md)

#### Returns

`OAuthClient`

## Methods

### getAuthorizationUrl()

> **getAuthorizationUrl**(`scopes`, `state?`): `string`

#### Parameters

##### scopes

`string`[]

##### state?

`string`

#### Returns

`string`

---

### getTokensFromCode()

> **getTokensFromCode**(`code`): `Promise`\<\{ `access_token`: `string`; `expires_in`: `number`; `refresh_token?`: `string`; \}\>

#### Parameters

##### code

`string`

#### Returns

`Promise`\<\{ `access_token`: `string`; `expires_in`: `number`; `refresh_token?`: `string`; \}\>

---

### refreshAccessToken()

> **refreshAccessToken**(`refreshToken`): `Promise`\<\{ `access_token`: `string`; `expires_in`: `number`; \}\>

#### Parameters

##### refreshToken

`string`

#### Returns

`Promise`\<\{ `access_token`: `string`; `expires_in`: `number`; \}\>
