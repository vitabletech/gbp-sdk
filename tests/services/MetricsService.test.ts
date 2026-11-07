import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MetricsService } from '../../src/services/MetricsService';
import { LocationsService } from '../../src/services/LocationsService';
import { QuotasService } from '../../src/services/QuotasService';
import { HttpClient } from '../../src/http/HttpClient';
import { TokenManager } from '../../src/authentication/TokenManager';
import {
  DailyMetric,
  DayOfWeek,
  GetDailyMetricsTimeSeriesRequest,
  PerformanceMetricsRequest,
  ListSearchKeywordsImpressionsMonthlyRequest,
} from '../../src/models/Metrics';

describe('MetricsService', () => {
  let metricsService: MetricsService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    const mockTokenManager = {} as TokenManager;
    mockHttpClient = new HttpClient(mockTokenManager, {
      clientId: 'test',
      clientSecret: 'test',
    });

    vi.spyOn(mockHttpClient, 'request').mockImplementation(async () => {
      return {};
    });

    metricsService = new MetricsService(mockHttpClient);
  });

  it('can be instantiated', () => {
    expect(metricsService).toBeInstanceOf(MetricsService);
  });

  describe('fetchMultiDailyMetricsTimeSeries', () => {
    it('generates correct API URL and GET query with start_date and end_date', async () => {
      const request: PerformanceMetricsRequest = {
        dailyMetrics: [
          DailyMetric.BUSINESS_IMPRESSIONS_DESKTOP_MAPS,
          DailyMetric.WEBSITE_CLICKS,
        ],
        dailyRange: {
          start_date: { year: 2024, month: 1, day: 1 },
          end_date: { year: 2024, month: 1, day: 31 },
        },
      };

      await metricsService.fetchMultiDailyMetricsTimeSeries('12345', request);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/12345:fetchMultiDailyMetricsTimeSeries',
        method: 'GET',
        query: {
          dailyMetrics: [
            DailyMetric.BUSINESS_IMPRESSIONS_DESKTOP_MAPS,
            DailyMetric.WEBSITE_CLICKS,
          ],
          'dailyRange.start_date.year': 2024,
          'dailyRange.start_date.month': 1,
          'dailyRange.start_date.day': 1,
          'dailyRange.end_date.year': 2024,
          'dailyRange.end_date.month': 1,
          'dailyRange.end_date.day': 31,
        },
      });
    });

    it('supports startDate and endDate in camelCase and existing locations/ prefix', async () => {
      const request: PerformanceMetricsRequest = {
        dailyMetrics: [DailyMetric.CALL_CLICKS],
        dailyRange: {
          startDate: { year: 2024, month: 2, day: 1 },
          endDate: { year: 2024, month: 2, day: 15 },
        },
      };

      await metricsService.fetchMultiDailyMetricsTimeSeries(
        'locations/12345',
        request
      );

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/12345:fetchMultiDailyMetricsTimeSeries',
        method: 'GET',
        query: {
          dailyMetrics: [DailyMetric.CALL_CLICKS],
          'dailyRange.start_date.year': 2024,
          'dailyRange.start_date.month': 2,
          'dailyRange.start_date.day': 1,
          'dailyRange.end_date.year': 2024,
          'dailyRange.end_date.month': 2,
          'dailyRange.end_date.day': 15,
        },
      });
    });

    it('supports dailySubEntityType query parameters', async () => {
      const request: PerformanceMetricsRequest = {
        dailyMetrics: [DailyMetric.CALL_CLICKS],
        dailyRange: {
          start_date: { year: 2024, month: 1, day: 1 },
          end_date: { year: 2024, month: 1, day: 5 },
        },
        dailySubEntityType: {
          dayOfWeek: DayOfWeek.MONDAY,
          timeOfDay: { hours: 14, minutes: 30, seconds: 0, nanos: 0 },
        },
      };

      await metricsService.fetchMultiDailyMetricsTimeSeries('12345', request);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/12345:fetchMultiDailyMetricsTimeSeries',
        method: 'GET',
        query: {
          dailyMetrics: [DailyMetric.CALL_CLICKS],
          'dailyRange.start_date.year': 2024,
          'dailyRange.start_date.month': 1,
          'dailyRange.start_date.day': 1,
          'dailyRange.end_date.year': 2024,
          'dailyRange.end_date.month': 1,
          'dailyRange.end_date.day': 5,
          'dailySubEntityType.dayOfWeek': DayOfWeek.MONDAY,
          'dailySubEntityType.timeOfDay.hours': 14,
          'dailySubEntityType.timeOfDay.minutes': 30,
          'dailySubEntityType.timeOfDay.seconds': 0,
          'dailySubEntityType.timeOfDay.nanos': 0,
        },
      });
    });
  });

  describe('getDailyMetricsTimeSeries', () => {
    it('calls :getDailyMetricsTimeSeries with single metric and date range', async () => {
      const request: GetDailyMetricsTimeSeriesRequest = {
        dailyMetric: DailyMetric.WEBSITE_CLICKS,
        dailyRange: {
          startDate: { year: 2024, month: 3, day: 1 },
          endDate: { year: 2024, month: 3, day: 31 },
        },
      };

      await metricsService.getDailyMetricsTimeSeries('12345', request);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/12345:getDailyMetricsTimeSeries',
        method: 'GET',
        query: {
          dailyMetric: DailyMetric.WEBSITE_CLICKS,
          'dailyRange.start_date.year': 2024,
          'dailyRange.start_date.month': 3,
          'dailyRange.start_date.day': 1,
          'dailyRange.end_date.year': 2024,
          'dailyRange.end_date.month': 3,
          'dailyRange.end_date.day': 31,
        },
      });
    });

    it('handles locations/ prefix and sub-entity filters', async () => {
      const request: GetDailyMetricsTimeSeriesRequest = {
        dailyMetric: DailyMetric.BUSINESS_DIRECTION_REQUESTS,
        dailyRange: {
          start_date: { year: 2024, month: 1, day: 1 },
          end_date: { year: 2024, month: 1, day: 10 },
        },
        dailySubEntityType: {
          dayOfWeek: DayOfWeek.FRIDAY,
        },
      };

      await metricsService.getDailyMetricsTimeSeries('locations/999', request);

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/999:getDailyMetricsTimeSeries',
        method: 'GET',
        query: {
          dailyMetric: DailyMetric.BUSINESS_DIRECTION_REQUESTS,
          'dailyRange.start_date.year': 2024,
          'dailyRange.start_date.month': 1,
          'dailyRange.start_date.day': 1,
          'dailyRange.end_date.year': 2024,
          'dailyRange.end_date.month': 1,
          'dailyRange.end_date.day': 10,
          'dailySubEntityType.dayOfWeek': DayOfWeek.FRIDAY,
        },
      });
    });
  });

  describe('listSearchKeywordsImpressionsMonthly', () => {
    it('calls GET /searchkeywords/impressions/monthly with monthlyRange and pagination options', async () => {
      const request: ListSearchKeywordsImpressionsMonthlyRequest = {
        monthlyRange: {
          startMonth: { year: 2024, month: 1 },
          endMonth: { year: 2024, month: 6 },
        },
        pageSize: 50,
        pageToken: 'token123',
      };

      await metricsService.listSearchKeywordsImpressionsMonthly(
        '12345',
        request
      );

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/12345/searchkeywords/impressions/monthly',
        method: 'GET',
        query: {
          'monthlyRange.startMonth.year': 2024,
          'monthlyRange.startMonth.month': 1,
          'monthlyRange.endMonth.year': 2024,
          'monthlyRange.endMonth.month': 6,
          pageSize: 50,
          pageToken: 'token123',
        },
      });
    });

    it('handles snake_case start_month and end_month with optional day', async () => {
      const request: ListSearchKeywordsImpressionsMonthlyRequest = {
        monthlyRange: {
          start_month: { year: 2024, month: 2, day: 1 },
          end_month: { year: 2024, month: 4, day: 30 },
        },
      };

      await metricsService.listSearchKeywordsImpressionsMonthly(
        'locations/12345',
        request
      );

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/12345/searchkeywords/impressions/monthly',
        method: 'GET',
        query: {
          'monthlyRange.startMonth.year': 2024,
          'monthlyRange.startMonth.month': 2,
          'monthlyRange.startMonth.day': 1,
          'monthlyRange.endMonth.year': 2024,
          'monthlyRange.endMonth.month': 4,
          'monthlyRange.endMonth.day': 30,
        },
      });
    });

    it('getSearchKeywordsImpressionsMonthly alias delegates to listSearchKeywordsImpressionsMonthly', async () => {
      const request: ListSearchKeywordsImpressionsMonthlyRequest = {
        monthlyRange: {
          startMonth: { year: 2024, month: 1 },
          endMonth: { year: 2024, month: 2 },
        },
      };

      await metricsService.getSearchKeywordsImpressionsMonthly(
        '12345',
        request
      );

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/12345/searchkeywords/impressions/monthly',
        method: 'GET',
        query: {
          'monthlyRange.startMonth.year': 2024,
          'monthlyRange.startMonth.month': 1,
          'monthlyRange.endMonth.year': 2024,
          'monthlyRange.endMonth.month': 2,
        },
      });
    });
  });

  describe('AutoPagination and CursorPagination', () => {
    it('listAllSearchKeywordsImpressionsMonthly traverses nextPageToken', async () => {
      vi.spyOn(mockHttpClient, 'request')
        .mockResolvedValueOnce({
          searchKeywordsCounts: [
            {
              searchKeyword: 'coffee',
              insightsValue: { value: '100' },
            },
          ],
          nextPageToken: 'page2',
        })
        .mockResolvedValueOnce({
          searchKeywordsCounts: [
            {
              searchKeyword: 'cafe',
              insightsValue: { threshold: '10' },
            },
          ],
        });

      const results =
        await metricsService.listAllSearchKeywordsImpressionsMonthly('12345', {
          monthlyRange: {
            startMonth: { year: 2024, month: 1 },
            endMonth: { year: 2024, month: 2 },
          },
        });

      expect(results).toHaveLength(2);
      expect(results[0].searchKeyword).toBe('coffee');
      expect(results[1].searchKeyword).toBe('cafe');
      expect(mockHttpClient.request).toHaveBeenCalledTimes(2);
    });

    it('listSearchKeywordsImpressionsMonthlyPaginator iterates using next()', async () => {
      vi.spyOn(mockHttpClient, 'request')
        .mockResolvedValueOnce({
          searchKeywordsCounts: [
            { searchKeyword: 'bakery', insightsValue: { value: '50' } },
          ],
          nextPageToken: 'page2',
        })
        .mockResolvedValueOnce({
          searchKeywordsCounts: [
            { searchKeyword: 'croissant', insightsValue: { value: '25' } },
          ],
        });

      const paginator =
        metricsService.listSearchKeywordsImpressionsMonthlyPaginator('12345', {
          monthlyRange: {
            startMonth: { year: 2024, month: 1 },
            endMonth: { year: 2024, month: 2 },
          },
        });

      expect(paginator.hasMore).toBe(true);
      const page1 = await paginator.next();
      expect(page1).toHaveLength(1);
      expect(page1[0].searchKeyword).toBe('bakery');
      expect(paginator.hasMore).toBe(true);

      const page2 = await paginator.next();
      expect(page2).toHaveLength(1);
      expect(page2[0].searchKeyword).toBe('croissant');
      expect(paginator.hasMore).toBe(false);

      const page3 = await paginator.next();
      expect(page3).toEqual([]);
    });
  });

  describe('Nested Resource Accessors', () => {
    it('searchkeywords.impressions.monthly.list works', async () => {
      await metricsService.searchkeywords.impressions.monthly.list('12345', {
        monthlyRange: {
          startMonth: { year: 2024, month: 1 },
          endMonth: { year: 2024, month: 3 },
        },
      });

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/12345/searchkeywords/impressions/monthly',
        method: 'GET',
        query: {
          'monthlyRange.startMonth.year': 2024,
          'monthlyRange.startMonth.month': 1,
          'monthlyRange.endMonth.year': 2024,
          'monthlyRange.endMonth.month': 3,
        },
      });
    });

    it('searchKeywords.impressions.monthly.list works as camelCase alias', async () => {
      await metricsService.searchKeywords.impressions.monthly.list('12345', {
        monthlyRange: {
          startMonth: { year: 2024, month: 1 },
          endMonth: { year: 2024, month: 3 },
        },
      });

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/12345/searchkeywords/impressions/monthly',
        method: 'GET',
        query: {
          'monthlyRange.startMonth.year': 2024,
          'monthlyRange.startMonth.month': 1,
          'monthlyRange.endMonth.year': 2024,
          'monthlyRange.endMonth.month': 3,
        },
      });
    });
  });

  describe('LocationsService delegation', () => {
    let locationsService: LocationsService;

    beforeEach(() => {
      locationsService = new LocationsService(mockHttpClient);
    });

    it('delegates getDailyMetricsTimeSeries', async () => {
      await locationsService.getDailyMetricsTimeSeries('loc1', {
        dailyMetric: DailyMetric.WEBSITE_CLICKS,
        dailyRange: {
          startDate: { year: 2024, month: 1, day: 1 },
          endDate: { year: 2024, month: 1, day: 5 },
        },
      });

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/loc1:getDailyMetricsTimeSeries',
        method: 'GET',
        query: {
          dailyMetric: DailyMetric.WEBSITE_CLICKS,
          'dailyRange.start_date.year': 2024,
          'dailyRange.start_date.month': 1,
          'dailyRange.start_date.day': 1,
          'dailyRange.end_date.year': 2024,
          'dailyRange.end_date.month': 1,
          'dailyRange.end_date.day': 5,
        },
      });
    });

    it('delegates fetchMultiDailyMetricsTimeSeries', async () => {
      await locationsService.fetchMultiDailyMetricsTimeSeries('loc1', {
        dailyMetrics: [DailyMetric.CALL_CLICKS],
        dailyRange: {
          startDate: { year: 2024, month: 1, day: 1 },
          endDate: { year: 2024, month: 1, day: 5 },
        },
      });

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/loc1:fetchMultiDailyMetricsTimeSeries',
        method: 'GET',
        query: {
          dailyMetrics: [DailyMetric.CALL_CLICKS],
          'dailyRange.start_date.year': 2024,
          'dailyRange.start_date.month': 1,
          'dailyRange.start_date.day': 1,
          'dailyRange.end_date.year': 2024,
          'dailyRange.end_date.month': 1,
          'dailyRange.end_date.day': 5,
        },
      });
    });

    it('delegates listSearchKeywordsImpressionsMonthly', async () => {
      await locationsService.listSearchKeywordsImpressionsMonthly('loc1', {
        monthlyRange: {
          startMonth: { year: 2024, month: 1 },
          endMonth: { year: 2024, month: 2 },
        },
      });

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/loc1/searchkeywords/impressions/monthly',
        method: 'GET',
        query: {
          'monthlyRange.startMonth.year': 2024,
          'monthlyRange.startMonth.month': 1,
          'monthlyRange.endMonth.year': 2024,
          'monthlyRange.endMonth.month': 2,
        },
      });
    });

    it('delegates searchkeywords.impressions.monthly.list', async () => {
      await locationsService.searchkeywords.impressions.monthly.list('loc1', {
        monthlyRange: {
          startMonth: { year: 2024, month: 1 },
          endMonth: { year: 2024, month: 2 },
        },
      });

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://businessprofileperformance.googleapis.com/v1/locations/loc1/searchkeywords/impressions/monthly',
        method: 'GET',
        query: {
          'monthlyRange.startMonth.year': 2024,
          'monthlyRange.startMonth.month': 1,
          'monthlyRange.endMonth.year': 2024,
          'monthlyRange.endMonth.month': 2,
        },
      });
    });
  });

  describe('QuotasService.getPerformance', () => {
    it('requests quotas for businessprofileperformance.googleapis.com', async () => {
      const quotasService = new QuotasService(mockHttpClient);
      await quotasService.getPerformance('project-456');

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://serviceusage.googleapis.com/v1beta1/projects/project-456/services/businessprofileperformance.googleapis.com/consumerQuotaMetrics',
        method: 'GET',
      });
    });
  });
});
