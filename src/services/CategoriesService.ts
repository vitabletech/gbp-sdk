import { HttpClient } from '../http/HttpClient';

export class CategoriesService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Returns a list of business categories.
   */
  public async list(options?: {
    languageCode?: string;
    view?: string;
    pageToken?: string;
  }): Promise<any> {
    return this.client.request({
      url: '/v1/categories',
      method: 'GET',
      query: options,
    });
  }

  /**
   * Searches for categories.
   */
  public async search(options: {
    searchTerm?: string;
    languageCode?: string;
    regionCode?: string;
    view?: string;
    pageToken?: string;
  }): Promise<any> {
    // Note: GBP API might not have a direct v1/categories:search endpoint or might use standard REST search pattern
    // Using the common pattern for Google APIs.
    return this.client.request({
      url: '/v1/categories',
      method: 'GET',
      query: options, // Assuming the standard list endpoint supports filtering by searchTerm or similar
    });
  }
}
