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
    accountId: string,
    locationId: string,
    options?: { pageToken?: string }
  ): Promise<any> {
    const accountName = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusiness.googleapis.com/v4/${accountName}/${locName}/media`,
      method: 'GET',
      query: options,
    });
  }

  /**
   * Gets a specific media item.
   */
  public async get(
    accountId: string,
    locationId: string,
    mediaKey: string
  ): Promise<any> {
    const accountName = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    const mKey = mediaKey.startsWith('media/') ? mediaKey : `media/${mediaKey}`;
    return this.client.request({
      url: `https://mybusiness.googleapis.com/v4/${accountName}/${locName}/${mKey}`,
      method: 'GET',
    });
  }

  /**
   * Creates/Uploads a new media item for a location.
   */
  public async create(
    accountId: string,
    locationId: string,
    data: any
  ): Promise<any> {
    const accountName = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusiness.googleapis.com/v4/${accountName}/${locName}/media`,
      method: 'POST',
      body: data,
    });
  }

  /**
   * Deletes a media item.
   */
  public async delete(
    accountId: string,
    locationId: string,
    mediaKey: string
  ): Promise<void> {
    const accountName = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    const mKey = mediaKey.startsWith('media/') ? mediaKey : `media/${mediaKey}`;
    await this.client.request({
      url: `https://mybusiness.googleapis.com/v4/${accountName}/${locName}/${mKey}`,
      method: 'DELETE',
    });
  }
}
