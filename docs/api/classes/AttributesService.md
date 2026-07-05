[**@vitabletech/gbp-sdk**](../index.md)

---

## Constructors

### Constructor

> **new AttributesService**(`client`): `AttributesService`

#### Parameters

##### client

[`HttpClient`](HttpClient.md)

#### Returns

`AttributesService`

## Methods

### list()

> **list**(`options`): `Promise`\<`any`>\>

Returns the list of attributes that would be available for a location with the given primary category and country.

#### Parameters

##### options

###### categoryName

`string`

###### languageCode?

`string`

###### pageSize?

`number`

###### pageToken?

`string`

###### parent?

`string`

###### regionCode

`string`

###### showAll?

`boolean`

#### Returns

`Promise`\<`any`\>

---

### updateFacebookUrl()

> **updateFacebookUrl**(`locationId`, `url`): `Promise`\<`any`>\>

#### Parameters

##### locationId

`string`

##### url

`string`

#### Returns

`Promise`\<`any`\>

---

### updateInstagramUrl()

> **updateInstagramUrl**(`locationId`, `url`): `Promise`\<`any`>\>

#### Parameters

##### locationId

`string`

##### url

`string`

#### Returns

`Promise`\<`any`\>

---

### updateLinkedInUrl()

> **updateLinkedInUrl**(`locationId`, `url`): `Promise`\<`any`>\>

#### Parameters

##### locationId

`string`

##### url

`string`

#### Returns

`Promise`\<`any`\>

---

### updateLocationAttributes()

> **updateLocationAttributes**(`locationId`, `attributes`): `Promise`\<`any`>\>

Automatically prepares and updates the attributes for a given location.
Takes an array of attributes and constructs the appropriate API payload and attributeMask.

#### Parameters

##### locationId

`string`

The ID of the location to update attributes for.

##### attributes

`any`[]

An array of attribute objects to update.

#### Returns

`Promise`\<`any`\>

---

### updatePinterestUrl()

> **updatePinterestUrl**(`locationId`, `url`): `Promise`\<`any`>\>

#### Parameters

##### locationId

`string`

##### url

`string`

#### Returns

`Promise`\<`any`\>

---

### updatePreferredMessagingService()

> **updatePreferredMessagingService**(`locationId`, `service`): `Promise`\<`any`>\>

#### Parameters

##### locationId

`string`

##### service

`string`

#### Returns

`Promise`\<`any`\>

---

### updateTextMessagingUrl()

> **updateTextMessagingUrl**(`locationId`, `url`): `Promise`\<`any`>\>

#### Parameters

##### locationId

`string`

##### url

`string`

#### Returns

`Promise`\<`any`\>

---

### updateTikTokUrl()

> **updateTikTokUrl**(`locationId`, `url`): `Promise`\<`any`>\>

#### Parameters

##### locationId

`string`

##### url

`string`

#### Returns

`Promise`\<`any`\>

---

### updateTwitterUrl()

> **updateTwitterUrl**(`locationId`, `url`): `Promise`\<`any`>\>

#### Parameters

##### locationId

`string`

##### url

`string`

#### Returns

`Promise`\<`any`\>

---

### updateWhatsAppUrl()

> **updateWhatsAppUrl**(`locationId`, `whatsappUrl`): `Promise`\<`any`>\>

Specifically sets the WhatsApp URL for a location.

#### Parameters

##### locationId

`string`

The ID of the location.

##### whatsappUrl

`string`

The WhatsApp URL (e.g. "https://wa.me/55555555").

#### Returns

`Promise`\<`any`\>

---

### updateYouTubeUrl()

> **updateYouTubeUrl**(`locationId`, `url`): `Promise`\<`any`>\>

#### Parameters

##### locationId

`string`

##### url

`string`

#### Returns

`Promise`\<`any`\>
