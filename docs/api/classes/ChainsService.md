[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new ChainsService**(`client`): `ChainsService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`ChainsService`

## Methods

### get()

> **get**(`chainName`): `Promise`\<[`Chain`](../interfaces/Chain.md)>>\>

Gets the specified chain.

#### Parameters

##### chainName

`string`

The name of the chain to fetch (e.g., 'chains/12345').

#### Returns

`Promise`\<[`Chain`](../interfaces/Chain.md)\>

---

### search()

> **search**(`query`, `pageSize?`): `Promise`\<[`SearchChainsResponse`](../interfaces/SearchChainsResponse.md)>>\>

Searches the chain based on chain name.

#### Parameters

##### query

`string`

The chain name query to search for (e.g., 'Starbucks').

##### pageSize?

`number`

Optional page size.

#### Returns

`Promise`\<[`SearchChainsResponse`](../interfaces/SearchChainsResponse.md)\>
