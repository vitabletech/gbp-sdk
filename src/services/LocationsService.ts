import { HttpClient } from '../http/HttpClient';
import { AutoPaginator } from '../utils/AutoPaginator';
import { CursorPaginator } from '../utils/CursorPaginator';

export class LocationsService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Lists all locations for a specific account.
   */
  public async list(
    accountId: string,
    options: { pageToken?: string; readMask?: string } = {}
  ): Promise<any> {
    const parent = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;
    if (!options.readMask) {
      options.readMask =
        'name,title,storeCode,websiteUri,phoneNumbers,regularHours';
    }

    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${parent}/locations`,
      method: 'GET',
      query: options,
    });
  }

  /**
   * Automatically fetches all locations for an account.
   */
  public async listAll(
    accountId: string,
    readMask: string = 'name,title,storeCode,websiteUri,phoneNumbers,regularHours'
  ): Promise<any[]> {
    const parent = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;
    return AutoPaginator.fetchAll(
      this.client,
      `https://mybusinessbusinessinformation.googleapis.com/v1/${parent}/locations`,
      'locations',
      { readMask }
    );
  }

  /**
   * Returns a paginator object to manually fetch locations page by page.
   */
  public listPaginator(
    accountId: string,
    options: { pageSize?: number; readMask?: string } = {}
  ): CursorPaginator<any> {
    const parent = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;

    if (!options.readMask) {
      options.readMask =
        'name,title,storeCode,websiteUri,phoneNumbers,regularHours';
    }

    return new CursorPaginator(
      this.client,
      `https://mybusinessbusinessinformation.googleapis.com/v1/${parent}/locations`,
      'locations',
      options
    );
  }

  /**
   * Gets a specific location by ID.
   */
  public async get(
    locationId: string,
    options: { readMask?: string } = {}
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    if (!options.readMask) {
      options.readMask =
        'name,title,storeCode,websiteUri,phoneNumbers,regularHours';
    } else {
      options.readMask = options.readMask.replace(/\s+/g, '');
    }

    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}`,
      method: 'GET',
      query: { readMask: options.readMask },
    });
  }

  /**
   * Creates a new location.
   */
  public async create(
    accountId: string,
    data: any,
    options?: { validateOnly?: boolean; requestId?: string }
  ): Promise<any> {
    // 1. Payload Validation
    if (!data.title) {
      throw new Error(
        "Validation Error: 'title' is required to create a location."
      );
    }
    if (!data.languageCode) {
      throw new Error(
        "Validation Error: 'languageCode' is required to create a location."
      );
    }
    if (!data.storefrontAddress && !data.serviceArea) {
      throw new Error(
        "Validation Error: At least one of 'storefrontAddress' or 'serviceArea' is required."
      );
    }
    if (
      !data.storefrontAddress &&
      !(data.phoneNumbers?.primaryPhone || data.websiteUri)
    ) {
      throw new Error(
        "Validation Error: At least one of 'phoneNumbers.primaryPhone' or 'websiteUri' is required when 'storefrontAddress' is not present."
      );
    }

    // 2. Normalize endpoint URL
    const parent = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;

    // 3. Make API request
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${parent}/locations`,
      method: 'POST',
      body: data,
      query: {
        validateOnly:
          options?.validateOnly !== undefined ? options.validateOnly : true,
        ...(options?.requestId && { requestId: options.requestId }),
      },
    });
  }

  /**
   * Updates an existing location.
   */
  public async patch(
    locationId: string,
    data: any,
    updateMask: string
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}`,
      method: 'PATCH',
      query: { updateMask },
      body: data,
    });
  }

  /**
   * Deletes a location.
   */
  public async delete(locationId: string): Promise<void> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    await this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}`,
      method: 'DELETE',
    });
  }

  /**
   * Gets attributes for a location.
   */
  public async getAttributes(locationId: string): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}/attributes`,
      method: 'GET',
    });
  }

  /**
   * Updates attributes for a location.
   */
  public async patchAttributes(
    locationId: string,
    data: any,
    attributeMask: string
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}/attributes`,
      method: 'PATCH',
      query: { attributeMask },
      body: data,
    });
  }
}
