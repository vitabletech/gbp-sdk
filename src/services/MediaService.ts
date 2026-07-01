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
   * Updates metadata of the specified media item.
   * Note: This can only be used to update the Category of a media item, with the exception that the new category cannot be COVER or PROFILE.
   * @param updateMask The specific fields to update. e.g. "locationAssociation.category"
   */
  public async patch(
    accountId: string,
    locationId: string,
    mediaKey: string,
    data: any,
    updateMask?: string
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
      method: 'PATCH',
      query: updateMask ? { updateMask } : undefined,
      body: data,
    });
  }

  /**
   * Uploads multiple media items for a location concurrently.
   */
  public async bulkCreate(
    accountId: string,
    locationId: string,
    mediaItems: any[]
  ): Promise<any[]> {
    const promises = mediaItems.map((item) =>
      this.create(accountId, locationId, item)
    );
    const results = await Promise.allSettled(promises);
    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return { status: 'success', data: result.value };
      } else {
        return {
          status: 'failed',
          index,
          error: result.reason.message || result.reason,
        };
      }
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
