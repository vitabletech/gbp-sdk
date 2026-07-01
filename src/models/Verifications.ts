export interface FetchVerificationOptionsRequest {
  languageCode: string;
  context?: ServiceBusinessContext;
}

export interface ServiceBusinessContext {
  address?: PostalAddress;
}

export interface PostalAddress {
  regionCode: string;
  languageCode?: string;
  postalCode?: string;
  sortingCode?: string;
  administrativeArea?: string;
  locality?: string;
  sublocality?: string;
  addressLines?: string[];
  recipients?: string[];
  organization?: string;
}

export interface FetchVerificationOptionsResponse {
  options: VerificationOption[];
}

export interface VerificationOption {
  verificationMethod: VerificationMethod;
  phoneNumber?: string;
  addressData?: AddressVerificationData;
  emailData?: EmailVerificationData;
  announcement?: string;
}

export enum VerificationMethod {
  VERIFICATION_METHOD_UNSPECIFIED = 'VERIFICATION_METHOD_UNSPECIFIED',
  ADDRESS = 'ADDRESS',
  EMAIL = 'EMAIL',
  PHONE_CALL = 'PHONE_CALL',
  SMS = 'SMS',
  AUTO = 'AUTO',
  VETTED_PARTNER = 'VETTED_PARTNER',
  MAIL = 'MAIL', // Replaced ADDRESS in newer APIs sometimes, but typically MAIL/ADDRESS
}

export interface AddressVerificationData {
  business: string;
  address: PostalAddress;
  expectedDeliveryDaysRegion?: number;
}

export interface EmailVerificationData {
  domain: string;
  user: string;
  isUserNameEditable: boolean;
}

export interface VoiceOfMerchantState {
  hasVoiceOfMerchant: boolean;
  hasBeenRedone?: boolean;
  resolveOwnershipConflict?: boolean;
  verify?: {
    hasPendingVerification: boolean;
  };
  waitForVoiceOfMerchant?: boolean;
}

export interface VerifyLocationRequest {
  method: VerificationMethod;
  languageCode: string;
  phoneNumber?: string;
  token?: string; // Sometimes needed depending on method
  context?: ServiceBusinessContext;
}

export interface VerifyLocationResponse {
  verification: Verification;
}

export interface Verification {
  name: string;
  method: VerificationMethod;
  state: VerificationState;
  createTime: string;
}

export enum VerificationState {
  VERIFICATION_STATE_UNSPECIFIED = 'VERIFICATION_STATE_UNSPECIFIED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface CompleteVerificationRequest {
  pin: string;
}

export interface CompleteVerificationResponse {
  verification: Verification;
}

export interface ListVerificationsResponse {
  verifications: Verification[];
  nextPageToken?: string;
}
