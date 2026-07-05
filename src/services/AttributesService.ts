import { HttpClient } from '../http/HttpClient';

export class AttributesService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Returns the list of attributes that would be available for a location with the given primary category and country.
   */
  public async list(options: {
    categoryName: string;
    regionCode: string;
    languageCode?: string;
    showAll?: boolean;
    pageSize?: number;
    pageToken?: string;
    parent?: string;
  }): Promise<any> {
    return this.client.request({
      url: 'https://mybusinessbusinessinformation.googleapis.com/v1/attributes',
      method: 'GET',
      query: options,
    });
  }
  /**
   * Automatically prepares and updates the attributes for a given location.
   * Takes an array of attributes and constructs the appropriate API payload and attributeMask.
   *
   * @param locationId The ID of the location to update attributes for.
   * @param attributes An array of attribute objects to update.
   */
  public async updateLocationAttributes(
    locationId: string,
    attributes: any[]
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;

    const attributeMask = attributes.map((attr: any) => attr.name).join(',');
    const body = {
      name: `${name}/attributes`,
      attributes: attributes,
    };

    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}/attributes`,
      method: 'PATCH',
      query: { attributeMask },
      body,
    });
  }

  /**
   * Specifically sets the WhatsApp URL for a location.
   *
   * @param locationId The ID of the location.
   * @param whatsappUrl The WhatsApp URL (e.g. "https://wa.me/55555555").
   */
  public async updateWhatsAppUrl(
    locationId: string,
    whatsappUrl: string
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;

    const body = {
      name: `${name}/attributes`,
      attributes: [
        {
          name: 'attributes/url_whatsapp',
          values: [],
          uriValues: [
            {
              uri: whatsappUrl,
            },
          ],
        },
      ],
    };

    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}/attributes`,
      method: 'PATCH',
      query: { attributeMask: 'attributes/url_whatsapp' },
      body,
    });
  }
  public async updateFacebookUrl(
    locationId: string,
    url: string
  ): Promise<any> {
    return this.updateSingleUrlAttribute(
      locationId,
      'attributes/url_facebook',
      url
    );
  }

  public async updateInstagramUrl(
    locationId: string,
    url: string
  ): Promise<any> {
    return this.updateSingleUrlAttribute(
      locationId,
      'attributes/url_instagram',
      url
    );
  }

  public async updateLinkedInUrl(
    locationId: string,
    url: string
  ): Promise<any> {
    return this.updateSingleUrlAttribute(
      locationId,
      'attributes/url_linkedin',
      url
    );
  }

  public async updatePinterestUrl(
    locationId: string,
    url: string
  ): Promise<any> {
    return this.updateSingleUrlAttribute(
      locationId,
      'attributes/url_pinterest',
      url
    );
  }

  public async updateTextMessagingUrl(
    locationId: string,
    url: string
  ): Promise<any> {
    return this.updateSingleUrlAttribute(
      locationId,
      'attributes/url_text_messaging',
      url
    );
  }

  public async updateTikTokUrl(locationId: string, url: string): Promise<any> {
    return this.updateSingleUrlAttribute(
      locationId,
      'attributes/url_tiktok',
      url
    );
  }

  public async updateTwitterUrl(locationId: string, url: string): Promise<any> {
    return this.updateSingleUrlAttribute(
      locationId,
      'attributes/url_twitter',
      url
    );
  }

  public async updateYouTubeUrl(locationId: string, url: string): Promise<any> {
    return this.updateSingleUrlAttribute(
      locationId,
      'attributes/url_youtube',
      url
    );
  }

  public async updatePreferredMessagingService(
    locationId: string,
    service: string
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}/attributes`,
      method: 'PATCH',
      query: { attributeMask: 'attributes/preferred_messaging_service' },
      body: {
        name: `${name}/attributes`,
        attributes: [
          {
            name: 'attributes/preferred_messaging_service',
            values: [service],
          },
        ],
      },
    });
  }

  private async updateSingleUrlAttribute(
    locationId: string,
    attributeName: string,
    url: string
  ): Promise<any> {
    const name = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return this.client.request({
      url: `https://mybusinessbusinessinformation.googleapis.com/v1/${name}/attributes`,
      method: 'PATCH',
      query: { attributeMask: attributeName },
      body: {
        name: `${name}/attributes`,
        attributes: [
          {
            name: attributeName,
            values: [url],
          },
        ],
      },
    });
  }
}
