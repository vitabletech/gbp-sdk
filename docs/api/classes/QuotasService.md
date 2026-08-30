---
title: 'QuotasService'
description: 'API Reference documentation for QuotasService in the @vitabletech/gbp-sdk.'
---

[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new QuotasService**(`client`): `QuotasService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`QuotasService`

## Methods

### get()

> **get**(`options`): `Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)>\>

Retrieves Google Cloud Service Usage quota limits programmatically.

#### Parameters

##### options

[`QuotaRequestOptions`](../interfaces/QuotaRequestOptions.md)

Required projectId and service name.

#### Returns

`Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)\>

A normalized array of quota limits.

---

### getAccountManagement()

> **getAccountManagement**(`projectId`): `Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)>\>

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)\>

---

### getBusinessInformation()

> **getBusinessInformation**(`projectId`): `Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)>\>

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)\>

---

### getLegacy()

> **getLegacy**(`projectId`): `Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)>\>

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)\>

---

### getLodging()

> **getLodging**(`projectId`): `Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)>\>

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)\>

---

### getPlaceActions()

> **getPlaceActions**(`projectId`): `Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)>\>

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)\>

---

### getQAndA()

> **getQAndA**(`projectId`): `Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)>\>

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)\>

---

### getVerifications()

> **getVerifications**(`projectId`): `Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)>\>

#### Parameters

##### projectId

`string`

#### Returns

`Promise`\<[`NormalizedQuotasResponse`](../interfaces/NormalizedQuotasResponse.md)\>
