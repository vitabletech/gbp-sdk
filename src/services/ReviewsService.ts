import { HttpClient } from '../http/HttpClient';
import { AutoPaginator } from '../utils/AutoPaginator';

export class ReviewsService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Lists all reviews for a location.
   */
  public async list(locationId: string, options?: { pageToken?: string }): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/reviews`,
      method: 'GET',
      query: options,
    });
  }

  /**
   * Automatically fetches all reviews for a location.
   */
  public async listAll(locationId: string): Promise<any[]> {
    return AutoPaginator.fetchAll(this.client, `/v1/${locationId}/reviews`, 'reviews');
  }

  /**
   * Gets a specific review by ID.
   */
  public async get(locationId: string, reviewId: string): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/reviews/${reviewId}`,
      method: 'GET',
    });
  }

  /**
   * Replies to a review.
   */
  public async reply(locationId: string, reviewId: string, reply: { comment: string }): Promise<any> {
    return this.client.request({
      url: `/v1/${locationId}/reviews/${reviewId}/reply`,
      method: 'PUT',
      body: reply,
    });
  }

  /**
   * Deletes a reply to a review.
   */
  public async deleteReply(locationId: string, reviewId: string): Promise<void> {
    await this.client.request({
      url: `/v1/${locationId}/reviews/${reviewId}/reply`,
      method: 'DELETE',
    });
  }
}
