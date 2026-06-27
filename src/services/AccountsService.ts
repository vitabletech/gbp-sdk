import { HttpClient } from '../http/HttpClient';
import { AutoPaginator } from '../utils/AutoPaginator';

export class AccountsService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Lists all Google Business Profile accounts for the authenticated user.
   */
  public async list(options?: { pageToken?: string }): Promise<any> {
    return this.client.request({
      url: 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      method: 'GET',
      query: options,
    });
  }

  /**
   * Automatically fetches all accounts, handling pagination internally.
   */
  public async listAll(): Promise<any[]> {
    return AutoPaginator.fetchAll(
      this.client,
      'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      'accounts'
    );
  }

  /**
   * Gets a specific account by ID.
   */
  public async get(accountId: string): Promise<any> {
    return this.client.request({
      url: `https://mybusinessaccountmanagement.googleapis.com/v1/${accountId}`,
      method: 'GET',
    });
  }
}
