import { HttpClient } from '../http/HttpClient';
import { PerformanceMetricsRequest } from '../models/Metrics';

export class MetricsService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Returns a report containing performance metrics by location.
   * Note: This uses the new Business Profile Performance API v1.
   *
   * @param locationId The location ID.
   * @param request The PerformanceMetricsRequest containing dailyMetrics and dailyRange.
   */
  public async fetchMultiDailyMetricsTimeSeries(
    locationId: string,
    request: PerformanceMetricsRequest
  ): Promise<any> {
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;

    // Construct the query parameters
    const query: Record<string, any> = {};
    if (request.dailyMetrics && Array.isArray(request.dailyMetrics)) {
      query.dailyMetrics = request.dailyMetrics;
    }
    if (request.dailyRange) {
      if (request.dailyRange.start_date) {
        if (request.dailyRange.start_date.year !== undefined)
          query['dailyRange.start_date.year'] =
            request.dailyRange.start_date.year;
        if (request.dailyRange.start_date.month !== undefined)
          query['dailyRange.start_date.month'] =
            request.dailyRange.start_date.month;
        if (request.dailyRange.start_date.day !== undefined)
          query['dailyRange.start_date.day'] =
            request.dailyRange.start_date.day;
      }
      if (request.dailyRange.end_date) {
        if (request.dailyRange.end_date.year !== undefined)
          query['dailyRange.end_date.year'] = request.dailyRange.end_date.year;
        if (request.dailyRange.end_date.month !== undefined)
          query['dailyRange.end_date.month'] =
            request.dailyRange.end_date.month;
        if (request.dailyRange.end_date.day !== undefined)
          query['dailyRange.end_date.day'] = request.dailyRange.end_date.day;
      }
    }

    return this.client.request({
      url: `https://businessprofileperformance.googleapis.com/v1/${locName}:fetchMultiDailyMetricsTimeSeries`,
      method: 'GET',
      query: query,
    });
  }
}
