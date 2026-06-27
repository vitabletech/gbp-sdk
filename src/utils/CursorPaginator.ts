import { HttpClient } from '../http/HttpClient';

export class CursorPaginator<T> {
  private client: HttpClient;
  private endpoint: string;
  private itemsKey: string;
  private queryParams: Record<string, any>;
  public pageToken?: string;
  public hasMore: boolean = true;
  private isFirstRequest: boolean = true;

  constructor(
    client: HttpClient,
    endpoint: string,
    itemsKey: string,
    queryParams: Record<string, any> = {}
  ) {
    this.client = client;
    this.endpoint = endpoint;
    this.itemsKey = itemsKey;
    this.queryParams = { ...queryParams };
  }

  /**
   * Fetches the next page of results.
   * Returns an empty array if there are no more results.
   */
  public async next(): Promise<T[]> {
    if (!this.hasMore) {
      return [];
    }

    const currentQuery = { ...this.queryParams };
    if (this.pageToken) {
      currentQuery.pageToken = this.pageToken;
    }

    const response = await this.client.request<any>({
      url: this.endpoint,
      method: 'GET',
      query: currentQuery,
    });

    const items = response[this.itemsKey] || [];
    this.pageToken = response.nextPageToken;
    this.isFirstRequest = false;

    // If there is no next page token, we have reached the end.
    if (!this.pageToken) {
      this.hasMore = false;
    }

    this.client.logger.info(
      `CursorPaginator: Fetched ${items.length} items from ${this.endpoint}`
    );

    return items;
  }
}
