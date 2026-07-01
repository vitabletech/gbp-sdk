# FAQ & API Behaviors

When integrating with the Google Business Profile API, there are several nuances, timelines, and restrictions that developers should be aware of.

Here are answers to common questions and best practices when using the SDK.

---

## Media & Photos

### When will an uploaded image reflect on Google Maps?

Whenever you upload new media (like a logo or cover photo) via the API, it rarely appears instantly.

- **Processing & Review**: Google briefly processes and reviews the image to ensure it meets their content policies.
- **Timeline**: It usually takes anywhere from a few minutes up to **24-48 hours** for the new image to fully propagate and become visible to the public on Google Maps and Google Search.
- **Note**: If you check the GBP dashboard directly, you might see it immediately, but public visibility on Maps is heavily cached and delayed.

### What does `category: "PROFILE"` mean?

If you upload an image with `"category": "LOGO"`, you might notice that Google's API returns it as `"category": "PROFILE"`.

This is completely normal and correct! In the Google Business Profile ecosystem, the "Logo" is treated internally as the business's main "Profile Photo". This is the round avatar image that appears next to the business name when you reply to reviews or post updates. Google is simply confirming: _"Got it! We have associated this image as your main PROFILE picture."_

### What other types of images can you post?

When uploading media via the `mediaFormat: "PHOTO"` or `"VIDEO"`, you must specify a `category`. Here are the supported categories:

- **`COVER`**: The main cover photo for the business.
- **`PROFILE`** (or `LOGO`): The avatar/profile picture.
- **`EXTERIOR`**: Photos of the outside of the location.
- **`INTERIOR`**: Photos of the inside of the location.
- **`PRODUCT`**: Photos of products you sell.
- **`AT_WORK`**: Photos of employees or the business at work.
- **`FOOD_AND_DRINK`**: Photos of food and drinks (for restaurants).
- **`MENU`**: Photos of the menu.
- **`TEAMS`**: Photos of the team.
- **`ADDITIONAL`**: Miscellaneous or uncategorized photos.

---

## Local Posts

Creating Local Posts (updates, offers, events) comes with strict requirements.

### Important Restrictions from Google

- **Public URL**: The `sourceUrl` for any media must be completely public (no authentication required). If it requires a login or token, Google's servers will reject it.
- **One Image Only**: A local post can only contain a maximum of **1 image**.
- **Dimensions & Size**: The image must be at least **250px by 250px** and between **10 KB and 5 MB**.

### Post Types (`topicType`)

You must strictly categorize every local post into one of the following:

- **`STANDARD`**: Used for general updates, announcements, or basic information. (Just requires a summary and optionally an image/button).
- **`EVENT`**: Used for posts announcing an event. _(Requires passing a `LocalPostEvent` object with a title, start date/time, and end date/time)._
- **`OFFER`**: Used for promotional posts, such as coupons or limited-time deals. _(Requires passing a `LocalPostOffer` object)._
- **`LOCAL_POST_TOPIC_TYPE_UNSPECIFIED`**: The default (but you shouldn't use this when creating a new post).

_(Note: `PRODUCT` posts are not currently supported through the standard v4 API endpoints)._

### Buttons (`actionType`)

If you include a `callToAction` object, you must select one of the following labels for the button. Keep in mind that some buttons behave differently:

- **`LEARN_MORE`**: Button labeled "Learn more" _(Requires a URL)_.
- **`BOOK`**: Button labeled "Book" _(Requires a URL)_.
- **`ORDER`**: Button labeled "Order" _(Requires a URL)_.
- **`SHOP`**: Button labeled "Shop" _(Requires a URL)_.
- **`SIGN_UP`**: Button labeled "Sign up" _(Requires a URL)_.
- **`CALL`**: Button labeled "Call now". _(Automatically triggers a phone call to the primary phone number on the business profile. Does not take a URL)._

---

## Chains & Global Brands

The Chains Service (`client.chains`) is primarily used when you are managing locations that belong to a franchise or a well-known global brand (like Starbucks, McDonald's, or Hilton).

### 1. Linking a Location to a Corporate Brand

When you create or update a location in the Google Business Profile API, you can specify that it belongs to a specific chain. If you link your location to the official Chain ID, Google will automatically:

- Apply the official corporate logo.
- Apply consistent branding and cover photos across all locations.
- Categorize the location correctly on Google Maps so it shows up when users search for "Starbucks near me."

### 2. Preventing Typos and Duplicates

Instead of letting a user manually type their business name as `"MacDonalds"` or `"Mc Donalds"`, your app can use the `client.chains.search('McDonalds')` method to find the official Google-recognized chain record. You then use that official ID when creating the location to ensure 100% data accuracy.

### 3. Enterprise Dashboard Features

If you are building a dashboard for agencies, you can use this service to build an auto-complete search bar. When a user creates a new location in your app, they can type "Domino's", your app queries the Chains API in the background, and gives them the official Chain to select from a dropdown list.

---

## General API Quirks & Best Practices

### Locations vs. Accounts (Location Groups)

In the Google Business Profile ecosystem, understanding the hierarchy is critical:

- **Standard Users**: A typical small business owner will just have a single `Account` (representing themselves), and their locations will be attached directly to it.
- **Agencies / Enterprise**: Larger organizations use "Location Groups" (previously known as Business Accounts). In the API, a Location Group is just treated as another `Account`.
- **Tip**: Always fetch `client.accounts.listAll()` first, and allow your user to select which account/group they want to operate on before fetching locations.

### Reviews & Replies

- **One Reply Only**: You can only have **one active reply** to a customer review. If you submit a new reply to the same review using `client.reviews.reply(...)`, it will silently overwrite your previous reply.
- **Visibility**: When you reply to a review via the API, the customer is typically notified via email.

### Are my Locations actually Live? (`VoiceOfMerchant`)

Just because you successfully created a location via the API does **not** mean it is visible on Google Maps!

- A location must be verified to go live.
- To check if a location is fully verified and under your control, use `client.verifications.getVoiceOfMerchantState(locationId)`.
- If `hasVoiceOfMerchant` is `true`, the location is verified and live. If it's `false`, the location is suspended, disabled, or pending PIN verification.

### Pagination Limits

Google enforces maximum page sizes on almost all list endpoints:

- **Locations**: Max `pageSize` is typically 100.
- **Reviews**: Max `pageSize` is typically 50.
- **Tip**: You don't have to worry about this! Simply use the SDK's built-in `listAll()` methods (like `client.locations.listAll(accountId)`), and the SDK will automatically traverse every single `nextPageToken` for you in the background and return the complete array.
