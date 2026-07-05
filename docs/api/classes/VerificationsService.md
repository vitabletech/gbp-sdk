[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new VerificationsService**(`client`): `VerificationsService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`VerificationsService`

## Methods

### complete()

> **complete**(`locationId`, `verificationId`, `request`): `Promise`\<[`CompleteVerificationResponse`](../interfaces/CompleteVerificationResponse.md)>>\>

Completes a PENDING verification using a PIN.

#### Parameters

##### locationId

`string`

The location name.

##### verificationId

`string`

The verification ID.

##### request

[`CompleteVerificationRequest`](../interfaces/CompleteVerificationRequest.md)

The CompleteVerificationRequest containing the PIN.

#### Returns

`Promise`\<[`CompleteVerificationResponse`](../interfaces/CompleteVerificationResponse.md)\>

---

### fetchVerificationOptions()

> **fetchVerificationOptions**(`locationId`, `request`): `Promise`\<[`FetchVerificationOptionsResponse`](../interfaces/FetchVerificationOptionsResponse.md)>>\>

Reports all eligible verification options for a location in a specific language.

#### Parameters

##### locationId

`string`

The location to verify.

##### request

[`FetchVerificationOptionsRequest`](../interfaces/FetchVerificationOptionsRequest.md)

The FetchVerificationOptionsRequest containing language code and optional context.

#### Returns

`Promise`\<[`FetchVerificationOptionsResponse`](../interfaces/FetchVerificationOptionsResponse.md)\>

---

### getVoiceOfMerchantState()

> **getVoiceOfMerchantState**(`locationId`): `Promise`\<[`VoiceOfMerchantState`](../interfaces/VoiceOfMerchantState.md)>>\>

Gets the VoiceOfMerchant state.

#### Parameters

##### locationId

`string`

The location to get VoiceOfMerchant state for.

#### Returns

`Promise`\<[`VoiceOfMerchantState`](../interfaces/VoiceOfMerchantState.md)\>

---

### list()

> **list**(`locationId`): `Promise`\<[`ListVerificationsResponse`](../interfaces/ListVerificationsResponse.md)>>\>

List verifications of a location, ordered by create time.

#### Parameters

##### locationId

`string`

The location to list verifications for.

#### Returns

`Promise`\<[`ListVerificationsResponse`](../interfaces/ListVerificationsResponse.md)\>

---

### verify()

> **verify**(`locationId`, `request`): `Promise`\<[`VerifyLocationResponse`](../interfaces/VerifyLocationResponse.md)>>\>

Starts the verification process for a location.

#### Parameters

##### locationId

`string`

The location to verify.

##### request

[`VerifyLocationRequest`](../interfaces/VerifyLocationRequest.md)

The VerifyLocationRequest containing method and language code.

#### Returns

`Promise`\<[`VerifyLocationResponse`](../interfaces/VerifyLocationResponse.md)\>
