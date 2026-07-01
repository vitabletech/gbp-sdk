# Verifications Service

## Introduction

The `VerificationsService` provides an interface for taking verification-related actions for locations on Google Business Profile, such as requesting postcards, phone calls, or completing SMS PIN verifications.

You can access this service via `client.verifications`.

### Official Documentation

[Google Business Profile: Verifications API Reference](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.verifications)

_(Note: Under the hood, this uses the specialized `https://mybusinessverifications.googleapis.com` endpoint automatically)._

---

## Methods

### `fetchVerificationOptions(locationId, request)`

Reports all eligible verification options for a location in a specific language.

```typescript
const options = await client.verifications.fetchVerificationOptions(
  'locations/12345',
  {
    languageCode: 'en',
  }
);
console.log(options.options);
```

### `verify(locationId, request)`

Starts the verification process for a location.

```typescript
import { VerificationMethod } from '@vitabletech/gbp-sdk';

const response = await client.verifications.verify('locations/12345', {
  method: VerificationMethod.PHONE_CALL,
  languageCode: 'en',
  phoneNumber: '+1234567890',
});
console.log('Verification started:', response.verification.name);
```

### `complete(locationId, verificationId, request)`

Completes a `PENDING` verification by supplying the PIN code.

```typescript
const response = await client.verifications.complete(
  'locations/12345',
  'verifications/67890',
  { pin: '123456' }
);
console.log('Verification completed:', response.verification.state);
```

### `list(locationId)`

List all verifications for a location, ordered by create time.

```typescript
const listResponse = await client.verifications.list('locations/12345');
console.log(listResponse.verifications);
```

### `getVoiceOfMerchantState(locationId)`

Gets the `VoiceOfMerchant` state (indicates whether you have full management control over the listing).

```typescript
const state =
  await client.verifications.getVoiceOfMerchantState('locations/12345');
console.log('Has Voice of Merchant:', state.hasVoiceOfMerchant);
```
