---
description: 'The `MetricsService` provides an interface to fetch performance metrics and insights for your Google Business Profile locations using the modern Business Profile Performance API (v1).'
---

# Metrics Service

## Introduction

The `MetricsService` provides an interface to fetch performance metrics and insights for your Google Business Profile locations using the modern **Business Profile Performance API (v1)**.

These types define the schema used to request performance metrics such as Map views, Search queries, website clicks, direction requests, and search keyword impression counts.

You can access this service via `client.metrics` or conveniently through `client.locations`.

### Official Documentation

- [Method: locations.getDailyMetricsTimeSeries](https://developers.google.com/my-business/reference/performance/rest/v1/locations/getDailyMetricsTimeSeries)
- [Method: locations.fetchMultiDailyMetricsTimeSeries](https://developers.google.com/my-business/reference/performance/rest/v1/locations/fetchMultiDailyMetricsTimeSeries)
- [REST Resource: locations.searchkeywords.impressions.monthly](https://developers.google.com/my-business/reference/performance/rest/v1/locations.searchkeywords.impressions.monthly/list)

---

## Methods

### `getDailyMetricsTimeSeries(locationId, request)`

Returns daily metrics time series for a location for a single daily metric across a date range.

#### Example

```typescript
import {
  DailyMetric,
  GetDailyMetricsTimeSeriesRequest,
} from '@vitabletech/gbp-sdk';

const request: GetDailyMetricsTimeSeriesRequest = {
  dailyMetric: DailyMetric.WEBSITE_CLICKS,
  dailyRange: {
    startDate: { year: 2024, month: 1, day: 1 },
    endDate: { year: 2024, month: 1, day: 31 },
  },
};

const response = await client.metrics.getDailyMetricsTimeSeries(
  'locations/12345',
  request
);
// or client.locations.getDailyMetricsTimeSeries('12345', request);
console.log('Daily Metrics Time Series:', response.timeSeries);
```

---

### `fetchMultiDailyMetricsTimeSeries(locationId, request)`

Returns a report containing performance metrics by location across a specific date range for multiple metrics.

#### Example

```typescript
import { PerformanceMetricsRequest, DailyMetric } from '@vitabletech/gbp-sdk';

const requestBody: PerformanceMetricsRequest = {
  dailyMetrics: [
    DailyMetric.BUSINESS_IMPRESSIONS_DESKTOP_MAPS,
    DailyMetric.WEBSITE_CLICKS,
  ],
  dailyRange: {
    start_date: { year: 2024, month: 1, day: 1 },
    end_date: { year: 2024, month: 1, day: 31 },
  },
};

const response = await client.metrics.fetchMultiDailyMetricsTimeSeries(
  'locations/12345',
  requestBody
);

console.log('Multi Daily Metrics:', response.multiDailyMetricTimeSeries);
```

---

### `listSearchKeywordsImpressionsMonthly(locationId, request)`

Returns search keywords used to find the business along with monthly impression counts or threshold privacy flags.

#### Example

```typescript
const response = await client.metrics.listSearchKeywordsImpressionsMonthly(
  '12345',
  {
    monthlyRange: {
      startMonth: { year: 2024, month: 1 },
      endMonth: { year: 2024, month: 3 },
    },
    pageSize: 50,
  }
);

console.log('Keywords:', response.searchKeywordsCounts);
```

---

### `listAllSearchKeywordsImpressionsMonthly(locationId, request)`

Automatically paginates and returns all keyword counts across all pages.

```typescript
const allKeywords =
  await client.metrics.listAllSearchKeywordsImpressionsMonthly('12345', {
    monthlyRange: {
      startMonth: { year: 2024, month: 1 },
      endMonth: { year: 2024, month: 3 },
    },
  });
```

---

### `listSearchKeywordsImpressionsMonthlyPaginator(locationId, request)`

Returns a cursor paginator to traverse keyword impressions page-by-page.

```typescript
const paginator = client.metrics.listSearchKeywordsImpressionsMonthlyPaginator(
  '12345',
  {
    monthlyRange: {
      startMonth: { year: 2024, month: 1 },
      endMonth: { year: 2024, month: 3 },
    },
    pageSize: 25,
  }
);

while (paginator.hasMore) {
  const page = await paginator.next();
  console.log(`Fetched ${page.length} keywords`);
}
```

---

### REST Resource Syntax: `searchkeywords.impressions.monthly.list`

You can also use the exact REST resource hierarchy as documented in Google API references:

```typescript
const response = await client.locations.searchkeywords.impressions.monthly.list(
  '12345',
  {
    monthlyRange: {
      startMonth: { year: 2024, month: 1 },
      endMonth: { year: 2024, month: 3 },
    },
  }
);
```

---

## Key Interfaces and Enums

The SDK exports the following primary types based on Google's official Performance API schema:

- **`DailyMetric` (Enum)**: The exact performance data points:
  - `BUSINESS_IMPRESSIONS_DESKTOP_MAPS`
  - `BUSINESS_IMPRESSIONS_DESKTOP_SEARCH`
  - `BUSINESS_IMPRESSIONS_MOBILE_MAPS`
  - `BUSINESS_IMPRESSIONS_MOBILE_SEARCH`
  - `BUSINESS_CONVERSATIONS`
  - `BUSINESS_DIRECTION_REQUESTS`
  - `CALL_CLICKS`
  - `WEBSITE_CLICKS`
  - `BUSINESS_BOOKINGS`
  - `BUSINESS_FOOD_ORDERS`
  - `BUSINESS_FOOD_MENU_CLICKS`
- **`DayOfWeek` (Enum)**: `MONDAY`, `TUESDAY`, `WEDNESDAY`, etc.
- **`DailyRange`**: Contains `startDate` / `start_date` and `endDate` / `end_date`.
- **`MonthlyRange`**: Contains `startMonth` / `start_month` and `endMonth` / `end_month`.
- **`GetDailyMetricsTimeSeriesRequest`**: Request parameters for single-metric daily time series.
- **`GetDailyMetricsTimeSeriesResponse`**: Response containing `timeSeries` and `datedValues`.
- **`PerformanceMetricsRequest`**: Request parameters for multi-daily metrics.
- **`FetchMultiDailyMetricsTimeSeriesResponse`**: Response containing `multiDailyMetricTimeSeries`.
- **`ListSearchKeywordsImpressionsMonthlyRequest`**: Request parameters for monthly keyword impressions.
- **`ListSearchKeywordsImpressionsMonthlyResponse`**: Response containing `searchKeywordsCounts` and `nextPageToken`.
