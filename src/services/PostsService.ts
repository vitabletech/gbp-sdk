import { HttpClient } from '../http/HttpClient';

export class PostsService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Lists all local posts for a location.
   */
  public async list(
    locationId: string,
    options?: { pageToken?: string }
  ): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/localPosts`,
      method: 'GET',
      query: options,
    });
  }

  /**
   * Creates a new local post.
   */
  public async create(locationId: string, data: any): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/localPosts`,
      method: 'POST',
      body: data,
    });
  }

  /**
   * Gets a specific local post.
   */
  public async get(locationId: string, localPostId: string): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/localPosts/${localPostId}`,
      method: 'GET',
    });
  }

  /**
   * Updates an existing local post.
   */
  public async patch(
    locationId: string,
    localPostId: string,
    data: any,
    updateMask: string
  ): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/localPosts/${localPostId}`,
      method: 'PATCH',
      query: { updateMask },
      body: data,
    });
  }

  /**
   * Deletes a local post.
   */
  public async delete(locationId: string, localPostId: string): Promise<void> {
    await this.client.request({
      url: `/v1/${locationId}/localPosts/${localPostId}`,
      method: 'DELETE',
    });
  }
}
