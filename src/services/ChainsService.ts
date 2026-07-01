import { HttpClient } from '../http/HttpClient';
import { Chain, SearchChainsResponse } from '../models/Chains';

export class ChainsService {
  private client: HttpClient;
  private readonly baseUrl =
    'https://mybusinessbusinessinformation.googleapis.com/v1';

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Gets the specified chain.
   *
   * @param chainName The name of the chain to fetch (e.g., 'chains/12345').
   */
  public async get(chainName: string): Promise<Chain> {
    const formattedName = chainName.startsWith('chains/')
      ? chainName
      : `chains/${chainName}`;

    return this.client.request({
      url: `${this.baseUrl}/${formattedName}`,
      method: 'GET',
    });
  }

  /**
   * Searches the chain based on chain name.
   *
   * @param query The chain name query to search for (e.g., 'Starbucks').
   * @param pageSize Optional page size.
   */
  public async search(
    query: string,
    pageSize?: number
  ): Promise<SearchChainsResponse> {
    const queryParams: Record<string, string | number> = { chainName: query };
    if (pageSize) {
      queryParams.resultCount = pageSize;
    }

    return this.client.request({
      url: `${this.baseUrl}/chains:search`,
      method: 'GET',
      query: queryParams,
    });
  }
}
