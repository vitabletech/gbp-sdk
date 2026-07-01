import { HttpClient } from '../http/HttpClient';
import {
  FetchVerificationOptionsRequest,
  FetchVerificationOptionsResponse,
  VoiceOfMerchantState,
  VerifyLocationRequest,
  VerifyLocationResponse,
  CompleteVerificationRequest,
  CompleteVerificationResponse,
  ListVerificationsResponse,
} from '../models/Verifications';

export class VerificationsService {
  private client: HttpClient;
  private readonly baseUrl =
    'https://mybusinessverifications.googleapis.com/v1';

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Reports all eligible verification options for a location in a specific language.
   *
   * @param locationId The location to verify.
   * @param request The FetchVerificationOptionsRequest containing language code and optional context.
   */
  public async fetchVerificationOptions(
    locationId: string,
    request: FetchVerificationOptionsRequest
  ): Promise<FetchVerificationOptionsResponse> {
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;

    return this.client.request({
      url: `${this.baseUrl}/${locName}:fetchVerificationOptions`,
      method: 'POST',
      body: request,
    });
  }

  /**
   * Gets the VoiceOfMerchant state.
   *
   * @param locationId The location to get VoiceOfMerchant state for.
   */
  public async getVoiceOfMerchantState(
    locationId: string
  ): Promise<VoiceOfMerchantState> {
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;

    return this.client.request({
      url: `${this.baseUrl}/${locName}/VoiceOfMerchantState`,
      method: 'GET',
    });
  }

  /**
   * Starts the verification process for a location.
   *
   * @param locationId The location to verify.
   * @param request The VerifyLocationRequest containing method and language code.
   */
  public async verify(
    locationId: string,
    request: VerifyLocationRequest
  ): Promise<VerifyLocationResponse> {
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;

    return this.client.request({
      url: `${this.baseUrl}/${locName}:verify`,
      method: 'POST',
      body: request,
    });
  }

  /**
   * Completes a PENDING verification using a PIN.
   *
   * @param locationId The location name.
   * @param verificationId The verification ID.
   * @param request The CompleteVerificationRequest containing the PIN.
   */
  public async complete(
    locationId: string,
    verificationId: string,
    request: CompleteVerificationRequest
  ): Promise<CompleteVerificationResponse> {
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;
    const vId = verificationId.startsWith('verifications/')
      ? verificationId
      : `verifications/${verificationId}`;

    return this.client.request({
      url: `${this.baseUrl}/${locName}/${vId}:complete`,
      method: 'POST',
      body: request,
    });
  }

  /**
   * List verifications of a location, ordered by create time.
   *
   * @param locationId The location to list verifications for.
   */
  public async list(locationId: string): Promise<ListVerificationsResponse> {
    const locName = locationId.startsWith('locations/')
      ? locationId
      : `locations/${locationId}`;

    return this.client.request({
      url: `${this.baseUrl}/${locName}/verifications`,
      method: 'GET',
    });
  }
}
