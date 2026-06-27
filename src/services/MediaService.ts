import { HttpClient } from '../http/HttpClient';

export class MediaService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Lists all media items for a location.
   */
  public async list(
    locationId: string,
    options?: { pageToken?: string }
  ): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/media`,
      method: 'GET',
      query: options,
    });
  }

  /**
   * Gets a specific media item.
   */
  public async get(locationId: string, mediaKey: string): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/media/${mediaKey}`,
      method: 'GET',
    });
  }

  /**
   * Creates/Uploads a new media item for a location.
   */
  public async create(locationId: string, data: any): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/media`,
      method: 'POST',
      body: data,
    });
  }

  /**
   * Deletes a media item.
   */
  public async delete(locationId: string, mediaKey: string): Promise<void> {
    await this.client.request({
      url: `/v1/${locationId}/media/${mediaKey}`,
      method: 'DELETE',
    });
  }
}
