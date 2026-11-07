export enum DailyMetric {
  DAILY_METRIC_UNKNOWN = 'DAILY_METRIC_UNKNOWN',
  BUSINESS_IMPRESSIONS_DESKTOP_MAPS = 'BUSINESS_IMPRESSIONS_DESKTOP_MAPS',
  BUSINESS_IMPRESSIONS_DESKTOP_SEARCH = 'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH',
  BUSINESS_IMPRESSIONS_MOBILE_MAPS = 'BUSINESS_IMPRESSIONS_MOBILE_MAPS',
  BUSINESS_IMPRESSIONS_MOBILE_SEARCH = 'BUSINESS_IMPRESSIONS_MOBILE_SEARCH',
  BUSINESS_CONVERSATIONS = 'BUSINESS_CONVERSATIONS',
  BUSINESS_DIRECTION_REQUESTS = 'BUSINESS_DIRECTION_REQUESTS',
  CALL_CLICKS = 'CALL_CLICKS',
  WEBSITE_CLICKS = 'WEBSITE_CLICKS',
  BUSINESS_BOOKINGS = 'BUSINESS_BOOKINGS',
  BUSINESS_FOOD_ORDERS = 'BUSINESS_FOOD_ORDERS',
  BUSINESS_FOOD_MENU_CLICKS = 'BUSINESS_FOOD_MENU_CLICKS',
}

export enum DayOfWeek {
  DAY_OF_WEEK_UNSPECIFIED = 'DAY_OF_WEEK_UNSPECIFIED',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface TimeOfDay {
  hours?: number;
  minutes?: number;
  seconds?: number;
  nanos?: number;
}

export interface DailySubEntityType {
  dayOfWeek?: DayOfWeek;
  timeOfDay?: TimeOfDay;
}

export interface DateRange {
  year: number;
  month: number;
  day?: number;
}

export interface DailyRange {
  start_date?: DateRange;
  end_date?: DateRange;
  startDate?: DateRange;
  endDate?: DateRange;
}

export interface PerformanceMetricsRequest {
  dailyMetrics: DailyMetric[];
  dailyRange: DailyRange;
  dailySubEntityType?: DailySubEntityType;
}

export interface DatedValue {
  date?: DateRange;
  value?: string;
}

export interface TimeSeries {
  datedValues?: DatedValue[];
}

export interface GetDailyMetricsTimeSeriesRequest {
  dailyMetric: DailyMetric;
  dailyRange: DailyRange;
  dailySubEntityType?: DailySubEntityType;
}

export interface GetDailyMetricsTimeSeriesResponse {
  timeSeries?: TimeSeries;
}

export interface DailyMetricTimeSeries {
  dailyMetric?: DailyMetric;
  dailySubEntityType?: DailySubEntityType;
  timeSeries?: TimeSeries;
}

export interface MultiDailyMetricTimeSeries {
  dailyMetricTimeSeries?: DailyMetricTimeSeries[];
}

export interface FetchMultiDailyMetricsTimeSeriesResponse {
  multiDailyMetricTimeSeries?: MultiDailyMetricTimeSeries[];
}

export interface Month {
  year: number;
  month: number;
  day?: number;
}

export interface MonthlyRange {
  startMonth?: Month;
  endMonth?: Month;
  start_month?: Month;
  end_month?: Month;
}

export interface InsightsValue {
  value?: string;
  threshold?: string;
}

export interface SearchKeywordCount {
  searchKeyword?: string;
  insightsValue?: InsightsValue;
}

export interface ListSearchKeywordsImpressionsMonthlyRequest {
  monthlyRange: MonthlyRange;
  pageSize?: number;
  pageToken?: string;
}

export interface ListSearchKeywordsImpressionsMonthlyResponse {
  searchKeywordsCounts?: SearchKeywordCount[];
  nextPageToken?: string;
}
