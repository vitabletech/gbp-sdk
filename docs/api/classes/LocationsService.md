[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new LocationsService**(`client`): `LocationsService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`LocationsService`

## Accessors

### searchkeywords

#### Get Signature

> **get** **searchkeywords**(): `object`

REST resource accessor for locations.searchkeywords.impressions.monthly.

##### Returns

`object`

###### impressions

> **impressions**: `object`

###### impressions.monthly

> **monthly**: `object`

###### impressions.monthly.list

> **list**: (`locationId`, `request`) => `Promise`\<[`ListSearchKeywordsImpressionsMonthlyResponse`](../interfaces/ListSearchKeywordsImpressionsMonthlyResponse.md)>\>

###### Parameters

###### locationId

`string`

###### request

[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md)

###### Returns

`Promise`\<[`ListSearchKeywordsImpressionsMonthlyResponse`](../interfaces/ListSearchKeywordsImpressionsMonthlyResponse.md)\>

###### impressions.monthly.listAll

> **listAll**: (`locationId`, `request`) => `Promise`\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)[]\>

###### Parameters

###### locationId

`string`

###### request

`Omit`\<[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md), `"pageToken"`\>

###### Returns

`Promise`\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)[]\>

###### impressions.monthly.listPaginator

> **listPaginator**: (`locationId`, `request`) => [`CursorPaginator`](CursorPaginator.md)\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)>\>

###### Parameters

###### locationId

`string`

###### request

[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md)

###### Returns

[`CursorPaginator`](CursorPaginator.md)\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)\>

---

### searchKeywords

#### Get Signature

> **get** **searchKeywords**(): `object`

CamelCase alias for searchkeywords REST resource accessor.

##### Returns

`object`

###### impressions

> **impressions**: `object`

###### impressions.monthly

> **monthly**: `object`

###### impressions.monthly.list

> **list**: (`locationId`, `request`) => `Promise`\<[`ListSearchKeywordsImpressionsMonthlyResponse`](../interfaces/ListSearchKeywordsImpressionsMonthlyResponse.md)>\>

###### Parameters

###### locationId

`string`

###### request

[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md)

###### Returns

`Promise`\<[`ListSearchKeywordsImpressionsMonthlyResponse`](../interfaces/ListSearchKeywordsImpressionsMonthlyResponse.md)\>

###### impressions.monthly.listAll

> **listAll**: (`locationId`, `request`) => `Promise`\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)[]\>

###### Parameters

###### locationId

`string`

###### request

`Omit`\<[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md), `"pageToken"`\>

###### Returns

`Promise`\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)[]\>

###### impressions.monthly.listPaginator

> **listPaginator**: (`locationId`, `request`) => [`CursorPaginator`](CursorPaginator.md)\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)>\>

###### Parameters

###### locationId

`string`

###### request

[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md)

###### Returns

[`CursorPaginator`](CursorPaginator.md)\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)\>

## Methods

### create()

> **create**(`accountId`, `data`, `options?`): `Promise`\<`any`>\>

Creates a new location.

#### Parameters

##### accountId

`string`

##### data

`any`

##### options?

###### requestId?

`string`

###### validateOnly?

`boolean`

#### Returns

`Promise`\<`any`\>

---

### delete()

> **delete**(`locationId`): `Promise`\<`void`>\>

Deletes a location.

#### Parameters

##### locationId

`string`

#### Returns

`Promise`\<`void`\>

---

### fetchMultiDailyMetricsTimeSeries()

> **fetchMultiDailyMetricsTimeSeries**(`locationId`, `request`): `Promise`\<[`FetchMultiDailyMetricsTimeSeriesResponse`](../interfaces/FetchMultiDailyMetricsTimeSeriesResponse.md)>\>

Returns a report containing multi daily performance metrics for a location.
Shortcut to MetricsService.fetchMultiDailyMetricsTimeSeries.

#### Parameters

##### locationId

`string`

The location ID.

##### request

[`PerformanceMetricsRequest`](../interfaces/PerformanceMetricsRequest.md)

The PerformanceMetricsRequest containing dailyMetrics and dailyRange.

#### Returns

`Promise`\<[`FetchMultiDailyMetricsTimeSeriesResponse`](../interfaces/FetchMultiDailyMetricsTimeSeriesResponse.md)\>

---

### get()

> **get**(`locationId`, `options?`): `Promise`\<`any`>\>

Gets a specific location by ID.

#### Parameters

##### locationId

`string`

##### options?

###### readMask?

`string`

#### Returns

`Promise`\<`any`\>

---

### getAttributes()

> **getAttributes**(`locationId`): `Promise`\<`any`>\>

Gets attributes for a location.

#### Parameters

##### locationId

`string`

#### Returns

`Promise`\<`any`\>

---

### getDailyMetricsTimeSeries()

> **getDailyMetricsTimeSeries**(`locationId`, `request`): `Promise`\<[`GetDailyMetricsTimeSeriesResponse`](../interfaces/GetDailyMetricsTimeSeriesResponse.md)>\>

Returns daily metrics time series for a location.
Shortcut to MetricsService.getDailyMetricsTimeSeries.

#### Parameters

##### locationId

`string`

The location ID.

##### request

[`GetDailyMetricsTimeSeriesRequest`](../interfaces/GetDailyMetricsTimeSeriesRequest.md)

The GetDailyMetricsTimeSeriesRequest containing dailyMetric, dailyRange, and optional dailySubEntityType.

#### Returns

`Promise`\<[`GetDailyMetricsTimeSeriesResponse`](../interfaces/GetDailyMetricsTimeSeriesResponse.md)\>

---

### getMetadata()

> **getMetadata**(`locationId`): `Promise`\<`any`>\>

Retrieves metadata for a location.

#### Parameters

##### locationId

`string`

#### Returns

`Promise`\<`any`\>

---

### getSearchKeywordsImpressionsMonthly()

> **getSearchKeywordsImpressionsMonthly**(`locationId`, `request`): `Promise`\<[`ListSearchKeywordsImpressionsMonthlyResponse`](../interfaces/ListSearchKeywordsImpressionsMonthlyResponse.md)>\>

Alias for listSearchKeywordsImpressionsMonthly.

#### Parameters

##### locationId

`string`

##### request

[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md)

#### Returns

`Promise`\<[`ListSearchKeywordsImpressionsMonthlyResponse`](../interfaces/ListSearchKeywordsImpressionsMonthlyResponse.md)\>

---

### getServiceItems()

> **getServiceItems**(`locationId`): `Promise`\<`any`>\>

Retrieves service items for a location.

#### Parameters

##### locationId

`string`

#### Returns

`Promise`\<`any`\>

---

### list()

> **list**(`accountId`, `options?`): `Promise`\<`any`>\>

Lists all locations for a specific account.

#### Parameters

##### accountId

`string`

##### options?

###### pageToken?

`string`

###### readMask?

`string`

#### Returns

`Promise`\<`any`\>

---

### listAll()

> **listAll**(`accountId`, `readMask?`): `Promise`\<`any`[]\>

Automatically fetches all locations for an account.

#### Parameters

##### accountId

`string`

##### readMask?

`string` = `'name,title,storeCode,websiteUri,phoneNumbers,regularHours'`

#### Returns

`Promise`\<`any`[]\>

---

### listAllSearchKeywordsImpressionsMonthly()

> **listAllSearchKeywordsImpressionsMonthly**(`locationId`, `request`): `Promise`\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)[]\>

Automatically fetches all search keywords impressions across all pages for a location.
Shortcut to MetricsService.listAllSearchKeywordsImpressionsMonthly.

#### Parameters

##### locationId

`string`

##### request

`Omit`\<[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md), `"pageToken"`\>

#### Returns

`Promise`\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)[]\>

---

### listPaginator()

> **listPaginator**(`accountId`, `options?`): [`CursorPaginator`](CursorPaginator.md)\<`any`>\>

Returns a paginator object to manually fetch locations page by page.

#### Parameters

##### accountId

`string`

##### options?

###### pageSize?

`number`

###### readMask?

`string`

#### Returns

[`CursorPaginator`](CursorPaginator.md)\<`any`\>

---

### listSearchKeywordsImpressionsMonthly()

> **listSearchKeywordsImpressionsMonthly**(`locationId`, `request`): `Promise`\<[`ListSearchKeywordsImpressionsMonthlyResponse`](../interfaces/ListSearchKeywordsImpressionsMonthlyResponse.md)>\>

Returns search keywords impressions monthly for a location.
Shortcut to MetricsService.listSearchKeywordsImpressionsMonthly.

#### Parameters

##### locationId

`string`

The location ID.

##### request

[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md)

The ListSearchKeywordsImpressionsMonthlyRequest containing monthlyRange and pagination options.

#### Returns

`Promise`\<[`ListSearchKeywordsImpressionsMonthlyResponse`](../interfaces/ListSearchKeywordsImpressionsMonthlyResponse.md)\>

---

### listSearchKeywordsImpressionsMonthlyPaginator()

> **listSearchKeywordsImpressionsMonthlyPaginator**(`locationId`, `request`): [`CursorPaginator`](CursorPaginator.md)\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)>\>

Returns a cursor paginator to fetch search keywords impressions page by page for a location.
Shortcut to MetricsService.listSearchKeywordsImpressionsMonthlyPaginator.

#### Parameters

##### locationId

`string`

##### request

[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md)

#### Returns

[`CursorPaginator`](CursorPaginator.md)\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)\>

---

### patch()

> **patch**(`locationId`, `data`, `updateMask`): `Promise`\<`any`>\>

Updates an existing location.

#### Parameters

##### locationId

`string`

##### data

`any`

##### updateMask

`string`

#### Returns

`Promise`\<`any`\>

---

### patchAttributes()

> **patchAttributes**(`locationId`, `data`, `attributeMask`): `Promise`\<`any`>\>

Updates attributes for a location.

#### Parameters

##### locationId

`string`

##### data

`any`

##### attributeMask

`string`

#### Returns

`Promise`\<`any`\>

---

### updateServiceItems()

> **updateServiceItems**(`locationId`, `serviceItems`): `Promise`\<`any`>\>

Updates service items for a location.

#### Parameters

##### locationId

`string`

##### serviceItems

`any`[]

#### Returns

`Promise`\<`any`\>
