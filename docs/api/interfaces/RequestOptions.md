[**@vitabletech/gbp-sdk**](../index.md)

***

## Extends

- `Omit`\<`RequestInit`, `"body"`\>

## Properties

### body?

> `optional` **body?**: `any`

***

### cache?

> `optional` **cache?**: `RequestCache`

A string indicating how the request will interact with the browser's cache to set request's cache.

#### Inherited from

`Omit.cache`

***

### credentials?

> `optional` **credentials?**: `RequestCredentials`

A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials.

#### Inherited from

`Omit.credentials`

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

A Headers object, an object literal, or an array of two-item arrays to set request's headers.

#### Overrides

`Omit.headers`

***

### integrity?

> `optional` **integrity?**: `string`

A cryptographic hash of the resource to be fetched by request. Sets request's integrity.

#### Inherited from

`Omit.integrity`

***

### keepalive?

> `optional` **keepalive?**: `boolean`

A boolean to set request's keepalive.

#### Inherited from

`Omit.keepalive`

***

### method?

> `optional` **method?**: `"GET"` \| `"POST"` \| `"PUT"` \| `"PATCH"` \| `"DELETE"`

A string to set request's method.

#### Overrides

`Omit.method`

***

### mode?

> `optional` **mode?**: `RequestMode`

A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode.

#### Inherited from

`Omit.mode`

***

### priority?

> `optional` **priority?**: `RequestPriority`

#### Inherited from

`Omit.priority`

***

### query?

> `optional` **query?**: `Record`\<`string`, `string` \| `number` \| `boolean` \| `undefined`\>

***

### redirect?

> `optional` **redirect?**: `RequestRedirect`

A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect.

#### Inherited from

`Omit.redirect`

***

### referrer?

> `optional` **referrer?**: `string`

A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer.

#### Inherited from

`Omit.referrer`

***

### referrerPolicy?

> `optional` **referrerPolicy?**: `ReferrerPolicy`

A referrer policy to set request's referrerPolicy.

#### Inherited from

`Omit.referrerPolicy`

***

### retries?

> `optional` **retries?**: `number`

***

### signal?

> `optional` **signal?**: `AbortSignal` \| `null`

An AbortSignal to set request's signal.

#### Inherited from

`Omit.signal`

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

***

### url

> **url**: `string`

***

### window?

> `optional` **window?**: `null`

Can only be null. Used to disassociate request from any Window.

#### Inherited from

`Omit.window`
