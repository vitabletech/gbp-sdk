import { GBPClientConfig, RequestOptions } from '../types';
import { TokenManager } from '../authentication/TokenManager';
import { HttpClient } from '../http/HttpClient';
import { AccountsService } from '../services/AccountsService';
import { LocationsService } from '../services/LocationsService';
import { ReviewsService } from '../services/ReviewsService';
import { CategoriesService } from '../services/CategoriesService';
import { PostsService } from '../services/PostsService';
import { MediaService } from '../services/MediaService';
import { MetricsService } from '../services/MetricsService';
import { VerificationsService } from '../services/VerificationsService';
import { ChainsService } from '../services/ChainsService';

export class GBPClient {
  private tokenManager: TokenManager;
  private httpClient: HttpClient;

  public accounts: AccountsService;
  public locations: LocationsService;
  public reviews: ReviewsService;
  public categories: CategoriesService;
  public posts: PostsService;
  public media: MediaService;
  public metrics: MetricsService;
  public verifications: VerificationsService;
  public chains: ChainsService;

  constructor(config: GBPClientConfig) {
    this.tokenManager = new TokenManager(config);
    this.httpClient = new HttpClient(this.tokenManager, config);

    // Initialize Services
    this.accounts = new AccountsService(this.httpClient);
    this.locations = new LocationsService(this.httpClient);
    this.reviews = new ReviewsService(this.httpClient);
    this.categories = new CategoriesService(this.httpClient);
    this.posts = new PostsService(this.httpClient);
    this.media = new MediaService(this.httpClient);
    this.metrics = new MetricsService(this.httpClient);
    this.verifications = new VerificationsService(this.httpClient);
    this.chains = new ChainsService(this.httpClient);
  }

  /**
   * Generic request method for unsupported or custom API endpoints.
   * This allows developers to use newly released Google APIs immediately.
   *
   * @param options Request options including url, method, query, body, etc.
   * @returns The parsed JSON response or raw text.
   */
  public async request<T = any>(options: RequestOptions): Promise<T> {
    return this.httpClient.request<T>(options);
  }

  /**
   * Processes an OAuth 2.0 authorization code to fetch and store tokens.
   */
  public async processAuthCode(code: string): Promise<void> {
    return this.tokenManager.processAuthCode(code);
  }

  /**
   * Generates the OAuth 2.0 authorization URL for user consent.
   */
  public getAuthorizationUrl(scopes: string[], state?: string): string {
    return this.tokenManager
      .getOAuthClient()
      .getAuthorizationUrl(scopes, state);
  }

  /**
   * Retrieves information about the current access token, such as its expiration time, scopes, and app ID.
   */
  public async getTokenInfo(): Promise<any> {
    return this.tokenManager.getTokenInfo();
  }
}
