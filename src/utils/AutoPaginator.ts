import { HttpClient } from '../http/HttpClient';

export interface PagedResponse<T> {
  items: T[];
  nextPageToken?: string;
}

export class AutoPaginator {
  public static async fetchAll<T>(
    client: HttpClient,
    endpoint: string,
    itemsKey: string,
    queryParams: Record<string, any> = {}
  ): Promise<T[]> {
    let allItems: T[] = [];
    let pageToken: string | undefined = undefined;

    do {
      const currentQuery = { ...queryParams };
      if (pageToken) {
        currentQuery.pageToken = pageToken;
      }

      const response = await client.request<any>({
        url: endpoint,
        method: 'GET',
        query: currentQuery,
      });

      const items = response[itemsKey] || [];
      allItems = allItems.concat(items);
      
      pageToken = response.nextPageToken;
    } while (pageToken);

    return allItems;
  }
}
