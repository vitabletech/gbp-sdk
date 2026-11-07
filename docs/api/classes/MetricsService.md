[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new MetricsService**(`client`): `MetricsService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`MetricsService`

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

### fetchMultiDailyMetricsTimeSeries()

> **fetchMultiDailyMetricsTimeSeries**(`locationId`, `request`): `Promise`\<[`FetchMultiDailyMetricsTimeSeriesResponse`](../interfaces/FetchMultiDailyMetricsTimeSeriesResponse.md)>\>

Returns a report containing performance metrics by location.
Note: This uses the Business Profile Performance API v1.

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

### getDailyMetricsTimeSeries()

> **getDailyMetricsTimeSeries**(`locationId`, `request`): `Promise`\<[`GetDailyMetricsTimeSeriesResponse`](../interfaces/GetDailyMetricsTimeSeriesResponse.md)>\>

Returns daily metrics time series for a location.
Note: This uses the Business Profile Performance API v1.

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

### listAllSearchKeywordsImpressionsMonthly()

> **listAllSearchKeywordsImpressionsMonthly**(`locationId`, `request`): `Promise`\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)[]\>

Automatically fetches all search keywords impressions across all pages.

#### Parameters

##### locationId

`string`

##### request

`Omit`\<[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md), `"pageToken"`\>

#### Returns

`Promise`\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)[]\>

---

### listSearchKeywordsImpressionsMonthly()

> **listSearchKeywordsImpressionsMonthly**(`locationId`, `request`): `Promise`\<[`ListSearchKeywordsImpressionsMonthlyResponse`](../interfaces/ListSearchKeywordsImpressionsMonthlyResponse.md)>\>

Returns search keywords impressions monthly for a location.
Note: This uses the Business Profile Performance API v1.

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

Returns a cursor paginator to fetch search keywords impressions page by page.

#### Parameters

##### locationId

`string`

##### request

[`ListSearchKeywordsImpressionsMonthlyRequest`](../interfaces/ListSearchKeywordsImpressionsMonthlyRequest.md)

#### Returns

[`CursorPaginator`](CursorPaginator.md)\<[`SearchKeywordCount`](../interfaces/SearchKeywordCount.md)\>
