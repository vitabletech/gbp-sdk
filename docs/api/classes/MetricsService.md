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

## Methods

### fetchMultiDailyMetricsTimeSeries()

> **fetchMultiDailyMetricsTimeSeries**(`locationId`, `request`): `Promise`\<`any`>>\>

Returns a report containing performance metrics by location.
Note: This uses the new Business Profile Performance API v1.

#### Parameters

##### locationId

`string`

The location ID.

##### request

[`PerformanceMetricsRequest`](../interfaces/PerformanceMetricsRequest.md)

The PerformanceMetricsRequest containing dailyMetrics and dailyRange.

#### Returns

`Promise`\<`any`\>
