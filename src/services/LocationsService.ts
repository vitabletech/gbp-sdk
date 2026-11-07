import { HttpClient } from '../http/HttpClient';
import { AutoPaginator } from '../utils/AutoPaginator';
import { CursorPaginator } from '../utils/CursorPaginator';
import {
  PerformanceMetricsRequest,
  FetchMultiDailyMetricsTimeSeriesResponse,
  GetDailyMetricsTimeSeriesRequest,
  GetDailyMetricsTimeSeriesResponse,
  ListSearchKeywordsImpressionsMonthlyRequest,
  ListSearchKeywordsImpressionsMonthlyResponse,
  SearchKeywordCount,
} from '../models/Metrics';
import { MetricsService } from './MetricsService';

export class LocationsService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Lists all locations for a specific account.
   */
  public async list(
    accountId: string,
    options: { pageToken?: string; readMask?: string } = {}
  ): Promise<any> {
    const parent = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;
    if (!options.readMask) {
      options.readMask =
        'name,title,storeCode,websiteUri,phoneNumbers,regularHours';
    }

    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${parent}/locations`,
      method: 'GET',
      query: options,
    });
  }

  /**
   * Automatically fetches all locations for an account.
   */
  public async listAll(
    accountId: string,
    readMask: string = 'name,title,storeCode,websiteUri,phoneNumbers,regularHours'
  ): Promise<any[]> {
    const parent = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;
    return AutoPaginator.fetchAll(
      this.client,
      `https://mybusinessbusinessinformation.googleapis.com/v1/${parent}/locations`,
      'locations',
      { readMask }
    );
  }

  /**
   * Returns a paginator object to manually fetch locations page by page.
   */
  public listPaginator(
    accountId: string,
    options: { pageSize?: number; readMask?: string } = {}
  ): CursorPaginator<any> {
    const parent = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;

    if (!options.readMask) {
      options.readMask =
        'name,title,storeCode,websiteUri,phoneNumbers,regularHours';
    }

    return new CursorPaginator(
      this.client,
      `https://mybusinessbusinessinformation.googleapis.com/v1/${parent}/locations`,
      'locations',
      options
    );
  }

  /**
   * Gets a specific location by ID.
   */
  public async get(
    locationId: string,
    options: { readMask?: string } = {}
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    if (!options.readMask) {
      options.readMask =
        'name,title,storeCode,websiteUri,phoneNumbers,regularHours';
    } else {
      options.readMask = options.readMask.replace(/\s+/g, '');
    }

    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}`,
      method: 'GET',
      query: { readMask: options.readMask },
    });
  }

  /**
   * Creates a new location.
   */
  public async create(
    accountId: string,
    data: any,
    options?: { validateOnly?: boolean; requestId?: string }
  ): Promise<any> {
    // 1. Payload Validation
    if (!data.title) {
      throw new Error(
        "Validation Error: 'title' is required to create a location."
      );
    }
    if (!data.languageCode) {
      throw new Error(
        "Validation Error: 'languageCode' is required to create a location."
      );
    }
    if (!data.storefrontAddress && !data.serviceArea) {
      throw new Error(
        "Validation Error: At least one of 'storefrontAddress' or 'serviceArea' is required."
      );
    }
    if (
      !data.storefrontAddress &&
      !(data.phoneNumbers?.primaryPhone || data.websiteUri)
    ) {
      throw new Error(
        "Validation Error: At least one of 'phoneNumbers.primaryPhone' or 'websiteUri' is required when 'storefrontAddress' is not present."
      );
    }

    // 2. Normalize endpoint URL
    const parent = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;

    // 3. Make API request
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${parent}/locations`,
      method: 'POST',
      body: data,
      query: {
        validateOnly:
          options?.validateOnly !== undefined ? options.validateOnly : true,
        ...(options?.requestId && { requestId: options.requestId }),
      },
    });
  }

  /**
   * Updates an existing location.
   */
  public async patch(
    locationId: string,
    data: any,
    updateMask: string
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}`,
      method: 'PATCH',
      query: { updateMask },
      body: data,
    });
  }

  /**
   * Deletes a location.
   */
  public async delete(locationId: string): Promise<void> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    await this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}`,
      method: 'DELETE',
    });
  }

  /**
   * Gets attributes for a location.
   */
  public async getAttributes(locationId: string): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}/attributes`,
      method: 'GET',
    });
  }

  /**
   * Updates attributes for a location.
   */
  public async patchAttributes(
    locationId: string,
    data: any,
    attributeMask: string
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}/attributes`,
      method: 'PATCH',
      query: { attributeMask },
      body: data,
    });
  }

  /**
   * Updates service items for a location.
   */
  public async updateServiceItems(
    locationId: string,
    serviceItems: any[]
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}`,
      method: 'PATCH',
      query: { updateMask: 'serviceItems' },
      body: { serviceItems },
    });
  }

  /**
   * Retrieves service items for a location.
   */
  public async getServiceItems(locationId: string): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}`,
      method: 'GET',
      query: { readMask: 'serviceItems' },
    });
  }

  /**
   * Retrieves metadata for a location.
   */
  public async getMetadata(locationId: string): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}`,
      method: 'GET',
      query: { readMask: 'metadata' },
    });
  }

  /**
   * Returns daily metrics time series for a location.
   * Shortcut to MetricsService.getDailyMetricsTimeSeries.
   *
   * @param locationId The location ID.
   * @param request The GetDailyMetricsTimeSeriesRequest containing dailyMetric, dailyRange, and optional dailySubEntityType.
   */
  public async getDailyMetricsTimeSeries(
    locationId: string,
    request: GetDailyMetricsTimeSeriesRequest
  ): Promise<GetDailyMetricsTimeSeriesResponse> {
    return new MetricsService(this.client).getDailyMetricsTimeSeries(
      locationId,
      request
    );
  }

  /**
   * Returns a report containing multi daily performance metrics for a location.
   * Shortcut to MetricsService.fetchMultiDailyMetricsTimeSeries.
   *
   * @param locationId The location ID.
   * @param request The PerformanceMetricsRequest containing dailyMetrics and dailyRange.
   */
  public async fetchMultiDailyMetricsTimeSeries(
    locationId: string,
    request: PerformanceMetricsRequest
  ): Promise<FetchMultiDailyMetricsTimeSeriesResponse> {
    return new MetricsService(this.client).fetchMultiDailyMetricsTimeSeries(
      locationId,
      request
    );
  }

  /**
   * Returns search keywords impressions monthly for a location.
   * Shortcut to MetricsService.listSearchKeywordsImpressionsMonthly.
   *
   * @param locationId The location ID.
   * @param request The ListSearchKeywordsImpressionsMonthlyRequest containing monthlyRange and pagination options.
   */
  public async listSearchKeywordsImpressionsMonthly(
    locationId: string,
    request: ListSearchKeywordsImpressionsMonthlyRequest
  ): Promise<ListSearchKeywordsImpressionsMonthlyResponse> {
    return new MetricsService(this.client).listSearchKeywordsImpressionsMonthly(
      locationId,
      request
    );
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
   * Automatically fetches all search keywords impressions across all pages for a location.
   * Shortcut to MetricsService.listAllSearchKeywordsImpressionsMonthly.
   */
  public async listAllSearchKeywordsImpressionsMonthly(
    locationId: string,
    request: Omit<ListSearchKeywordsImpressionsMonthlyRequest, 'pageToken'>
  ): Promise<SearchKeywordCount[]> {
    return new MetricsService(
      this.client
    ).listAllSearchKeywordsImpressionsMonthly(locationId, request);
  }

  /**
   * Returns a cursor paginator to fetch search keywords impressions page by page for a location.
   * Shortcut to MetricsService.listSearchKeywordsImpressionsMonthlyPaginator.
   */
  public listSearchKeywordsImpressionsMonthlyPaginator(
    locationId: string,
    request: ListSearchKeywordsImpressionsMonthlyRequest
  ): CursorPaginator<SearchKeywordCount> {
    return new MetricsService(
      this.client
    ).listSearchKeywordsImpressionsMonthlyPaginator(locationId, request);
  }

  /**
   * REST resource accessor for locations.searchkeywords.impressions.monthly.
   */
  public get searchkeywords() {
    return new MetricsService(this.client).searchkeywords;
  }

  /**
   * CamelCase alias for searchkeywords REST resource accessor.
   */
  public get searchKeywords() {
    return this.searchkeywords;
  }
}
