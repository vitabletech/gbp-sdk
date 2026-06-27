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
    regionCode?: string;
  }): Promise<any> {
    return this.client.request({
      url: 'https://mybusinessbusinessinformation.googleapis.com/v1/categories',
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
    const query: any = { ...options };

    if (options.searchTerm) {
      const firstWord = options.searchTerm.split(' ')[0];
      query.filter = `displayName=${firstWord}`;
      delete query.searchTerm;
    }

    const response = await this.client.request({
      url: 'https://mybusinessbusinessinformation.googleapis.com/v1/categories',
      method: 'GET',
      query: query,
    });

    // In-memory refinement to handle multi-word searches like "petrol pump"
    if (options.searchTerm && response.categories) {
      const searchLower = options.searchTerm.toLowerCase();
      response.categories = response.categories.filter((cat: any) =>
        cat.displayName?.toLowerCase().includes(searchLower)
      );
    }

    return response;
  }
}
