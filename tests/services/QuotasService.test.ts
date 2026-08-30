import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QuotasService } from '../../src/services/QuotasService';
import { HttpClient } from '../../src/http/HttpClient';
import { TokenManager } from '../../src/authentication/TokenManager';

describe('QuotasService', () => {
  let quotasService: QuotasService;
  let mockHttpClient: HttpClient;

  beforeEach(() => {
    // Create a mock HttpClient
    const mockTokenManager = {} as TokenManager;
    mockHttpClient = new HttpClient(mockTokenManager, {
      clientId: 'test',
      clientSecret: 'test',
    });

    // Mock the request method
    vi.spyOn(mockHttpClient, 'request').mockImplementation(async () => {
      return {};
    });

    quotasService = new QuotasService(mockHttpClient);
  });

  it('can be instantiated', () => {
    expect(quotasService).toBeInstanceOf(QuotasService);
  });

  it('validates projectId', async () => {
    await expect(
      quotasService.get({ projectId: '', service: 'test-service' })
    ).rejects.toThrow('projectId is required for quota requests');
  });

  it('validates service', async () => {
    await expect(
      quotasService.get({ projectId: '123', service: '' })
    ).rejects.toThrow('service is required for quota requests');
  });

  it('generates correct API URL and uses GET method', async () => {
    await quotasService.get({
      projectId: '513681269462',
      service: 'mybusinessbusinessinformation.googleapis.com',
    });

    expect(mockHttpClient.request).toHaveBeenCalledWith({
      url: 'https://serviceusage.googleapis.com/v1beta1/projects/513681269462/services/mybusinessbusinessinformation.googleapis.com/consumerQuotaMetrics',
      method: 'GET',
    });
  });

  it('correctly normalizes the Google quota response with effectiveLimit', async () => {
    const mockResponse = {
      metrics: [
        {
          metric:
            'mybusinessbusinessinformation.googleapis.com/create_location_requests',
          displayName: 'Create Location requests per day',
          consumerQuotaLimits: [
            {
              unit: '1/d',
              isEffective: true,
              quotaBuckets: [
                {
                  effectiveLimit: '100',
                  defaultLimit: '200',
                },
              ],
            },
          ],
        },
      ],
    };

    vi.spyOn(mockHttpClient, 'request').mockResolvedValue(mockResponse);

    const result = await quotasService.get({
      projectId: '123',
      service: 'mybusiness',
    });

    expect(result).toEqual({
      projectId: '123',
      service: 'mybusiness',
      quotas: [
        {
          metric:
            'mybusinessbusinessinformation.googleapis.com/create_location_requests',
          displayName: 'Create Location requests per day',
          limit: 100,
          unit: '1/d',
        },
      ],
    });
  });

  it('handles unlimited limit correctly', async () => {
    const mockResponse = {
      metrics: [
        {
          metric: 'test_metric',
          consumerQuotaLimits: [
            {
              unit: '1/min',
              quotaBuckets: [
                {
                  effectiveLimit: 'unlimited',
                },
              ],
            },
          ],
        },
      ],
    };

    vi.spyOn(mockHttpClient, 'request').mockResolvedValue(mockResponse);

    const result = await quotasService.get({
      projectId: '123',
      service: 'mybusiness',
    });

    expect(result.quotas[0].limit).toBeNull();
  });

  describe('Helper Methods', () => {
    it('getBusinessInformation calls get with the correct service', async () => {
      const mockResponse = {
        metrics: [
          {
            metric: 'test.googleapis.com/requests',
            displayName: 'Test Requests',
            consumerQuotaLimits: [
              {
                unit: '1/d',
                quotaBuckets: [{ effectiveLimit: '100' }],
              },
            ],
          },
        ],
      };

      vi.spyOn(mockHttpClient, 'request').mockResolvedValue(mockResponse);

      const result =
        await quotasService.getBusinessInformation('test-project-123');

      expect(mockHttpClient.request).toHaveBeenCalledWith({
        url: 'https://serviceusage.googleapis.com/v1beta1/projects/test-project-123/services/mybusinessbusinessinformation.googleapis.com/consumerQuotaMetrics',
        method: 'GET',
      });

      expect(result.projectId).toBe('test-project-123');
      expect(result.service).toBe(
        'mybusinessbusinessinformation.googleapis.com'
      );
      expect(result.quotas).toHaveLength(1);
      expect(result.quotas[0].limit).toBe(100);
    });
  });
});
