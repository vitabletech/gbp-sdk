import { HttpClient } from '../http/HttpClient';
import {
  QuotaRequestOptions,
  NormalizedQuotasResponse,
  QuotaMetric,
} from '../types';

interface GoogleQuotaBucket {
  effectiveLimit?: string;
  defaultLimit?: string;
  dimensions?: Record<string, string>;
}

interface GoogleQuotaLimit {
  name?: string;
  metric?: string;
  unit?: string;
  isEffective?: boolean;
  quotaBuckets?: GoogleQuotaBucket[];
}

interface GoogleQuotaMetric {
  name?: string;
  metric?: string;
  displayName?: string;
  consumerQuotaLimits?: GoogleQuotaLimit[];
}

interface GoogleConsumerQuotaMetricsResponse {
  metrics?: GoogleQuotaMetric[];
  nextPageToken?: string;
}

export class QuotasService {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Retrieves Google Cloud Service Usage quota limits programmatically.
   *
   * @param options Required projectId and service name.
   * @returns A normalized array of quota limits.
   */
  public async get(
    options: QuotaRequestOptions
  ): Promise<NormalizedQuotasResponse> {
    if (!options || !options.projectId) {
      throw new Error('projectId is required for quota requests');
    }
    if (!options.service) {
      throw new Error('service is required for quota requests');
    }

    const url = `https://serviceusage.googleapis.com/v1beta1/projects/${encodeURIComponent(
      options.projectId
    )}/services/${encodeURIComponent(options.service)}/consumerQuotaMetrics`;

    const response =
      await this.client.request<GoogleConsumerQuotaMetricsResponse>({
        url,
        method: 'GET',
      });

    return {
      projectId: options.projectId,
      service: options.service,
      quotas: this.normalizeQuotas(response),
    };
  }

  public async getBusinessInformation(
    projectId: string
  ): Promise<NormalizedQuotasResponse> {
    return this.get({
      projectId,
      service: 'mybusinessbusinessinformation.googleapis.com',
    });
  }

  public async getAccountManagement(
    projectId: string
  ): Promise<NormalizedQuotasResponse> {
    return this.get({
      projectId,
      service: 'mybusinessaccountmanagement.googleapis.com',
    });
  }

  public async getVerifications(
    projectId: string
  ): Promise<NormalizedQuotasResponse> {
    return this.get({
      projectId,
      service: 'mybusinessverifications.googleapis.com',
    });
  }

  public async getQAndA(projectId: string): Promise<NormalizedQuotasResponse> {
    return this.get({ projectId, service: 'mybusinessqanda.googleapis.com' });
  }

  public async getLodging(
    projectId: string
  ): Promise<NormalizedQuotasResponse> {
    return this.get({ projectId, service: 'mybusinesslodging.googleapis.com' });
  }

  public async getPlaceActions(
    projectId: string
  ): Promise<NormalizedQuotasResponse> {
    return this.get({
      projectId,
      service: 'mybusinessplaceactions.googleapis.com',
    });
  }

  public async getLegacy(projectId: string): Promise<NormalizedQuotasResponse> {
    return this.get({ projectId, service: 'mybusiness.googleapis.com' });
  }

  private normalizeQuotas(
    response: GoogleConsumerQuotaMetricsResponse
  ): QuotaMetric[] {
    const normalized: QuotaMetric[] = [];

    if (!response || !response.metrics) {
      return normalized;
    }

    for (const metric of response.metrics) {
      if (
        !metric.consumerQuotaLimits ||
        metric.consumerQuotaLimits.length === 0
      ) {
        continue;
      }

      for (const limitObj of metric.consumerQuotaLimits) {
        if (!limitObj.quotaBuckets || limitObj.quotaBuckets.length === 0) {
          continue;
        }

        for (const bucket of limitObj.quotaBuckets) {
          const limitStr = bucket.effectiveLimit || bucket.defaultLimit;
          let limitValue: number | null = null;

          if (limitStr && limitStr.toLowerCase() !== 'unlimited') {
            limitValue = parseInt(limitStr, 10);
            if (isNaN(limitValue)) {
              limitValue = null; // fallback if unparseable
            }
          }

          normalized.push({
            metric: metric.metric || '',
            displayName: metric.displayName || '',
            limit: limitValue,
            unit: limitObj.unit || '',
          });
        }
      }
    }

    return normalized;
  }
}
