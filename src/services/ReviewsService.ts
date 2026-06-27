import { HttpClient } from '../http/HttpClient';
import { AutoPaginator } from '../utils/AutoPaginator';

export class ReviewsService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  private getParentName(accountId: string, locationId: string): string {
    const accountStr = accountId.startsWith('accounts/')
      ? accountId
      : `accounts/${accountId}`;
    const locationStr = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    return `${accountStr}/${locationStr}`;
  }

  /**
   * Lists all reviews for a location.
   */
  public async list(
    accountId: string,
    locationId: string,
    options?: { pageToken?: string }
  ): Promise<any> {
    const parent = this.getParentName(accountId, locationId);
    return this.client.request({
      url: `https://mybusiness.googleapis.com/v4/${parent}/reviews`,
      method: 'GET',
      query: options,
    });
  }

  /**
   * Automatically fetches all reviews for a location.
   */
  public async listAll(accountId: string, locationId: string): Promise<any[]> {
    const parent = this.getParentName(accountId, locationId);
    return AutoPaginator.fetchAll(
      this.client,
      `https://mybusiness.googleapis.com/v4/${parent}/reviews`,
      'reviews'
    );
  }

  /**
   * Gets a specific review by ID.
   */
  public async get(
    accountId: string,
    locationId: string,
    reviewId: string
  ): Promise<any> {
    const parent = this.getParentName(accountId, locationId);
    return this.client.request({
      url: `https://mybusiness.googleapis.com/v4/${parent}/reviews/${reviewId}`,
      method: 'GET',
    });
  }

  /**
   * Replies to a review.
   */
  public async reply(
    accountId: string,
    locationId: string,
    reviewId: string,
    reply: { comment: string }
  ): Promise<any> {
    const parent = this.getParentName(accountId, locationId);
    return this.client.request({
      url: `https://mybusiness.googleapis.com/v4/${parent}/reviews/${reviewId}/reply`,
      method: 'PUT',
      body: reply,
    });
  }

  /**
   * Deletes a reply to a review.
   */
  public async deleteReply(
    accountId: string,
    locationId: string,
    reviewId: string
  ): Promise<void> {
    const parent = this.getParentName(accountId, locationId);
    await this.client.request({
      url: `https://mybusiness.googleapis.com/v4/${parent}/reviews/${reviewId}/reply`,
      method: 'DELETE',
    });
  }
}
