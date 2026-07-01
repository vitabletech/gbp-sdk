# Metrics Service

## Introduction

The `MetricsService` provides an interface to fetch performance metrics and insights for your Google Business Profile locations using the modern **Business Profile Performance API (v1)**.

These types define the schema used to request performance metrics such as Map views, Search queries, website clicks, and direction requests.

You can access this service via `client.metrics`.

### Official Documentation

[Google Business Profile: Performance API Reference](https://developers.google.com/my-business/reference/performance/rest/v1/locations/fetchMultiDailyMetricsTimeSeries)

---

## Methods

### `fetchMultiDailyMetricsTimeSeries(locationId, request)`

Returns a report containing performance metrics by location across a specific date range.

#### Example

```typescript
import { PerformanceMetricsRequest, DailyMetric } from '@vitabletech/gbp-sdk';

const requestBody: PerformanceMetricsRequest = {
  dailyMetrics: [
    DailyMetric.BUSINESS_IMPRESSIONS_DESKTOP_MAPS,
    DailyMetric.WEBSITE_CLICKS,
  ],
  dailyRange: {
    start_date: { year: 2023, month: 1, day: 1 },
    end_date: { year: 2023, month: 1, day: 31 },
  },
};

// Fetch Metrics for a location using the native service
const response = await client.metrics.fetchMultiDailyMetricsTimeSeries(
  'locations/12345',
  requestBody
);

console.log('Metrics Response:', response);
```

---

## Key Interfaces and Enums

The SDK exports the following primary types based on Google's official Performance API schema:

- **`PerformanceMetricsRequest`**: The root object containing `dailyMetrics` and `dailyRange`.
- **`DailyRange`**: Contains `start_date` and `end_date` (as `DateRange` objects with year, month, day).
- **`DailyMetric` (Enum)**: The exact performance data points you want to track, including:
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
