# Frequently Asked Questions (FAQ)

Here are the answers to the most common questions developers have when working with the `@vitabletech/gbp-sdk` and the Google Business Profile APIs.

---

## Authentication & Setup

### Where do I get my `clientId` and `clientSecret`?
You need to create a project in the [Google Cloud Console](https://console.cloud.google.com/), enable the **Google Business Profile API**, and create an OAuth 2.0 Web Client credential. Google will provide the ID and Secret there.

### Does this SDK generate the Google Login Screen for my users?
**No.** This SDK handles the backend server-to-server communication with Google APIs. You still need to redirect your users to Google's OAuth consent screen on your frontend. Once the user approves and Google redirects them back to your site with a temporary `code`, you can pass that code into the SDK (`client.processAuthCode(code)`) to get the tokens.

### Why is `refreshToken` optional in the constructor?
Sometimes developers use the SDK just to generate the initial Authorization URL or to process an incoming OAuth code before they actually possess a Refresh Token. However, to make actual API calls to Google Business Profile, a valid Refresh Token (or Access Token) is strictly required.

### My access token expires in 1 hour. Do I need to manually refresh it?
**No.** The SDK automatically detects when your token expires. It will seamlessly pause your API request, fetch a fresh access token from Google using your Refresh Token, save it, and then resume your API request. You never have to worry about manual token refreshes.

### How do I securely store tokens for thousands of users?
By default, the SDK offers `memory` (clears on restart) and `file` (writes to local disk, good for single-tenant bots). For production SaaS apps with many users, you should write a custom `TokenStorage` class that reads/writes tokens directly to your database (like PostgreSQL or Redis). See the [Token Storage Guide](/guides/token-storage) for an example.

---

## API Usage & Behavior

### How does Pagination work? Do I have to write `while` loops?
Google restricts the number of items returned in a single API call (e.g., returning only 50 reviews at a time). 
- If you use the `listAll()` methods, the SDK writes the `while` loop for you and returns every single item in one massive array.
- If you use the standard `list()` methods, it returns exactly one page of results and a `nextPageToken` so you can build your own manual pagination in your UI.

### What happens if I hit Google's Rate Limits (HTTP 429)?
Google strictly rate-limits the GBP APIs. This SDK includes a built-in retry mechanism. If it detects an HTTP 429 error, the SDK will automatically wait for a few seconds using exponential backoff and attempt the request again before giving up.

### What is a `readMask` and why is it required?
Google wants to save bandwidth, so they force you to explicitly declare exactly which fields you want them to return in a response. If you don't provide a `readMask` in your options, the SDK will automatically supply a sensible default (like `name,title` for Locations). 

### How can I test location creation without actually spamming my Google account?
Use the `validateOnly` option!
```typescript
await client.locations.create(accountId, payload, { validateOnly: true });
```
This tells Google to strictly validate your JSON payload for missing fields and address formatting, but it will *not* actually create the listing on Google Maps.

---

## Errors & Debugging

### Why am I getting a "Validation Error" before the network request even fires?
The SDK includes pre-flight checks. For complex methods like `locations.create()`, the SDK inspects your payload *before* sending it to Google. If it notices you are missing a strictly required field (like a `languageCode` or `title`), it throws an Error immediately to save you a round-trip to the network.

### How do I see the raw HTTP requests the SDK is making?
Pass a logger into the SDK constructor!
```typescript
import { ConsoleLogger } from '@vitabletech/gbp-sdk';

const client = new GBPClient({
  // ... credentials
  logger: new ConsoleLogger()
});
```
This will print every outgoing URL, method, and incoming status code to your terminal.

---

## Compatibility

### Does this SDK work in Edge environments (Vercel Edge, Cloudflare Workers)?
**Yes.** The SDK uses the native standard `fetch` API under the hood, meaning it is perfectly compatible with modern Edge runtimes. 
*Note:* You cannot use the `'file'` TokenStorage option in Edge environments because there is no file system. You must use `'memory'` or build a custom database storage class.

### Is this SDK fully typed? Do I need to install `@types/...`?
The SDK is written 100% natively in TypeScript. All types are exported automatically. You do not need to install any external type definitions.
