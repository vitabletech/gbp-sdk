import { HttpClient } from '../http/HttpClient';
import {
  PerformanceMetricsRequest,
  FetchMultiDailyMetricsTimeSeriesResponse,
  GetDailyMetricsTimeSeriesRequest,
  GetDailyMetricsTimeSeriesResponse,
  ListSearchKeywordsImpressionsMonthlyRequest,
  ListSearchKeywordsImpressionsMonthlyResponse,
  SearchKeywordCount,
  DailyRange,
  DailySubEntityType,
} from '../models/Metrics';
import { AutoPaginator } from '../utils/AutoPaginator';
import { CursorPaginator } from '../utils/CursorPaginator';

export class MetricsService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  private normalizeLocationName(locationId: string): string {
    return locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
  }

  private applyDailyRangeQuery(
    query: Record<string, any>,
    dailyRange?: DailyRange
  ): void {
    if (!dailyRange) return;

    const startDate = dailyRange.startDate || dailyRange.start_date;
    const endDate = dailyRange.endDate || dailyRange.end_date;

    if (startDate) {
      if (startDate.year !== undefined)
        query['dailyRange.start_date.year'] = startDate.year;
      if (startDate.month !== undefined)
        query['dailyRange.start_date.month'] = startDate.month;
      if (startDate.day !== undefined)
        query['dailyRange.start_date.day'] = startDate.day;
    }
    if (endDate) {
      if (endDate.year !== undefined)
        query['dailyRange.end_date.year'] = endDate.year;
      if (endDate.month !== undefined)
        query['dailyRange.end_date.month'] = endDate.month;
      if (endDate.day !== undefined)
        query['dailyRange.end_date.day'] = endDate.day;
    }
  }

  private applyDailySubEntityTypeQuery(
    query: Record<string, any>,
    subEntity?: DailySubEntityType
  ): void {
    if (!subEntity) return;

    if (subEntity.dayOfWeek) {
      query['dailySubEntityType.dayOfWeek'] = subEntity.dayOfWeek;
    }
    if (subEntity.timeOfDay) {
      if (subEntity.timeOfDay.hours !== undefined)
        query['dailySubEntityType.timeOfDay.hours'] = subEntity.timeOfDay.hours;
      if (subEntity.timeOfDay.minutes !== undefined)
        query['dailySubEntityType.timeOfDay.minutes'] =
          subEntity.timeOfDay.minutes;
      if (subEntity.timeOfDay.seconds !== undefined)
        query['dailySubEntityType.timeOfDay.seconds'] =
          subEntity.timeOfDay.seconds;
      if (subEntity.timeOfDay.nanos !== undefined)
        query['dailySubEntityType.timeOfDay.nanos'] = subEntity.timeOfDay.nanos;
    }
  }

  private buildMonthlyRangeQuery(
    request: ListSearchKeywordsImpressionsMonthlyRequest
  ): Record<string, any> {
    const query: Record<string, any> = {};

    if (request.monthlyRange) {
      const startMonth =
        request.monthlyRange.startMonth || request.monthlyRange.start_month;
      const endMonth =
        request.monthlyRange.endMonth || request.monthlyRange.end_month;

      if (startMonth) {
        if (startMonth.year !== undefined)
          query['monthlyRange.startMonth.year'] = startMonth.year;
        if (startMonth.month !== undefined)
          query['monthlyRange.startMonth.month'] = startMonth.month;
        if (startMonth.day !== undefined)
          query['monthlyRange.startMonth.day'] = startMonth.day;
      }
      if (endMonth) {
        if (endMonth.year !== undefined)
          query['monthlyRange.endMonth.year'] = endMonth.year;
        if (endMonth.month !== undefined)
          query['monthlyRange.endMonth.month'] = endMonth.month;
        if (endMonth.day !== undefined)
          query['monthlyRange.endMonth.day'] = endMonth.day;
      }
    }

    if (request.pageSize !== undefined) {
      query.pageSize = request.pageSize;
    }
    if (request.pageToken !== undefined) {
      query.pageToken = request.pageToken;
    }

    return query;
  }

  /**
   * Returns a report containing performance metrics by location.
   * Note: This uses the Business Profile Performance API v1.
   *
   * @param locationId The location ID.
   * @param request The PerformanceMetricsRequest containing dailyMetrics and dailyRange.
   */
  public async fetchMultiDailyMetricsTimeSeries(
    locationId: string,
    request: PerformanceMetricsRequest
  ): Promise<FetchMultiDailyMetricsTimeSeriesResponse> {
    const locName = this.normalizeLocationName(locationId);

    // Construct the query parameters
    const query: Record<string, any> = {};
    if (request.dailyMetrics && Array.isArray(request.dailyMetrics)) {
      query.dailyMetrics = request.dailyMetrics;
    }
    this.applyDailyRangeQuery(query, request.dailyRange);
    this.applyDailySubEntityTypeQuery(query, request.dailySubEntityType);

    return this.client.request({
      url: `https://businessprofileperformance.googleapis.com/v1/${locName}:fetchMultiDailyMetricsTimeSeries`,
      method: 'GET',
      query: query,
    });
  }

  /**
   * Returns daily metrics time series for a location.
   * Note: This uses the Business Profile Performance API v1.
   *
   * @param locationId The location ID.
   * @param request The GetDailyMetricsTimeSeriesRequest containing dailyMetric, dailyRange, and optional dailySubEntityType.
   */
  public async getDailyMetricsTimeSeries(
    locationId: string,
    request: GetDailyMetricsTimeSeriesRequest
  ): Promise<GetDailyMetricsTimeSeriesResponse> {
    const locName = this.normalizeLocationName(locationId);

    const query: Record<string, any> = {};
    if (request.dailyMetric) {
      query.dailyMetric = request.dailyMetric;
    }
    this.applyDailyRangeQuery(query, request.dailyRange);
    this.applyDailySubEntityTypeQuery(query, request.dailySubEntityType);

    return this.client.request({
      url: `https://businessprofileperformance.googleapis.com/v1/${locName}:getDailyMetricsTimeSeries`,
      method: 'GET',
      query: query,
    });
  }

  /**
   * Returns search keywords impressions monthly for a location.
   * Note: This uses the Business Profile Performance API v1.
   *
   * @param locationId The location ID.
   * @param request The ListSearchKeywordsImpressionsMonthlyRequest containing monthlyRange and pagination options.
   */
  public async listSearchKeywordsImpressionsMonthly(
    locationId: string,
    request: ListSearchKeywordsImpressionsMonthlyRequest
  ): Promise<ListSearchKeywordsImpressionsMonthlyResponse> {
    const locName = this.normalizeLocationName(locationId);
    const query = this.buildMonthlyRangeQuery(request);

    return this.client.request({
      url: `https://businessprofileperformance.googleapis.com/v1/${locName}/searchkeywords/impressions/monthly`,
      method: 'GET',
      query: query,
    });
  }

  /**
   * Alias for listSearchKeywordsImpressionsMonthly.
   */
  public async getSearchKeywordsImpressionsMonthly(
    locationId: string,
    request: ListSearchKeywordsImpressionsMonthlyRequest
  ): Promise<ListSearchKeywordsImpressionsMonthlyResponse> {
    return this.listSearchKeywordsImpressionsMonthly(locationId, request);
  }

  /**
   * Automatically fetches all search keywords impressions across all pages.
   */
  public async listAllSearchKeywordsImpressionsMonthly(
    locationId: string,
    request: Omit<ListSearchKeywordsImpressionsMonthlyRequest, 'pageToken'>
  ): Promise<SearchKeywordCount[]> {
    const locName = this.normalizeLocationName(locationId);
    const query = this.buildMonthlyRangeQuery(
      request as ListSearchKeywordsImpressionsMonthlyRequest
    );

    return AutoPaginator.fetchAll<SearchKeywordCount>(
      this.client,
      `https://businessprofileperformance.googleapis.com/v1/${locName}/searchkeywords/impressions/monthly`,
      'searchKeywordsCounts',
      query
    );
  }

  /**
   * Returns a cursor paginator to fetch search keywords impressions page by page.
   */
  public listSearchKeywordsImpressionsMonthlyPaginator(
    locationId: string,
    request: ListSearchKeywordsImpressionsMonthlyRequest
  ): CursorPaginator<SearchKeywordCount> {
    const locName = this.normalizeLocationName(locationId);
    const query = this.buildMonthlyRangeQuery(request);

    return new CursorPaginator<SearchKeywordCount>(
      this.client,
      `https://businessprofileperformance.googleapis.com/v1/${locName}/searchkeywords/impressions/monthly`,
      'searchKeywordsCounts',
      query
    );
  }

  /**
   * REST resource accessor for locations.searchkeywords.impressions.monthly.
   */
  public get searchkeywords() {
    return {
      impressions: {
        monthly: {
          list: (
            locationId: string,
            request: ListSearchKeywordsImpressionsMonthlyRequest
          ): Promise<ListSearchKeywordsImpressionsMonthlyResponse> =>
            this.listSearchKeywordsImpressionsMonthly(locationId, request),
          listAll: (
            locationId: string,
            request: Omit<
              ListSearchKeywordsImpressionsMonthlyRequest,
              'pageToken'
            >
          ): Promise<SearchKeywordCount[]> =>
            this.listAllSearchKeywordsImpressionsMonthly(locationId, request),
          listPaginator: (
            locationId: string,
            request: ListSearchKeywordsImpressionsMonthlyRequest
          ): CursorPaginator<SearchKeywordCount> =>
            this.listSearchKeywordsImpressionsMonthlyPaginator(
              locationId,
              request
            ),
        },
      },
    };
  }

  /**
   * CamelCase alias for searchkeywords REST resource accessor.
   */
  public get searchKeywords() {
    return this.searchkeywords;
  }
}
