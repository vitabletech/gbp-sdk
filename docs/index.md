---
layout: home

hero:
  name: 'GBP Node.js SDK'
  text: 'The Enterprise standard.'
  tagline: 'Manage locations, menus, attributes, media, reviews, verifications, and quotas with zero-config OAuth, auto-pagination, and strict type safety.'
  image:
    src: /Home-page.png
    alt: GBP SDK Hero Image
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/introduction
    - theme: alt
      text: API Reference
      link: /api-reference/accounts
    - theme: alt
      text: View on GitHub
      link: https://github.com/vitabletech/gbp-sdk
---

<script setup>
import { version } from '../package.json'
</script>

<style>
/* 1. Animated Gradient for the Main Hero Title */
.VPHero .name {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: hue-rotate 6s linear infinite;
}

@keyframes hue-rotate {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

.VPHero .image-src {
  max-width: 80%;
  max-height: none;
  width: 90%;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
}

/* 2. Infinite Marquee Animation */
.marquee-wrapper {
  overflow: hidden;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
  background-size: 200% 100%;
  color: white;
  padding: 12px 0;
  border-radius: 8px;
  margin: 2rem 0;
  display: flex;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.marquee-content {
  display: flex;
  animation: scroll 25s linear infinite;
}

.marquee-item {
  margin: 0 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-wrapper:hover .marquee-content {
  animation-play-state: paused;
}

/* 3. Custom Grids */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 1rem 0 3rem;
}

.feature-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.25s, background-color 0.25s;
}

.feature-card:hover {
  border-color: var(--vp-c-brand);
}

.feature-card h3 {
  margin: 0 0 12px !important;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.feature-card p {
  margin: 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.step-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
}

.step-number {
  color: var(--vp-c-brand);
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 8px;
  display: block;
}

.install-cmd {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: var(--vp-c-bg-alt);
  padding: 12px 24px;
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  margin: -1rem 0 2rem;
  border: 1px solid var(--vp-c-divider);
}

.feature-link {
  text-decoration: none !important;
}

.feature-link h3 {
  color: var(--vp-c-text-1) !important;
}
.feature-link:hover h3 {
  color: var(--vp-c-brand) !important;
}
</style>

<div align="center">
  <div class="install-cmd">
    <code>npm install @vitabletech/gbp-sdk</code>
  </div>
</div>

<div class="marquee-wrapper">
  <div class="marquee-content">
    <!-- First set -->
    <span class="marquee-item">🚀 v{{ version }} is LIVE!</span>
    <span class="marquee-item">✅ Native Verifications API</span>
    <span class="marquee-item">📈 Quotas API Support</span>
    <span class="marquee-item">🔗 Official Chains API</span>
    <span class="marquee-item">🍔 Food Menus Types</span>
    <span class="marquee-item">📊 v1 Performance Metrics</span>
    <span class="marquee-item">🤖 Auto-Pagination Built-in!</span>
    <!-- Duplicate set for seamless scrolling -->
    <span class="marquee-item">🚀 v{{ version }} is LIVE!</span>
    <span class="marquee-item">✅ Native Verifications API</span>
    <span class="marquee-item">📈 Quotas API Support</span>
    <span class="marquee-item">🔗 Official Chains API</span>
    <span class="marquee-item">🍔 Food Menus Types</span>
    <span class="marquee-item">📊 v1 Performance Metrics</span>
    <span class="marquee-item">🤖 Auto-Pagination Built-in!</span>
  </div>
</div>

---

## 🛠️ What you can manage

<div class="grid-container">
  <div class="feature-card">
    <h3>🏪 Business Profiles</h3>
    <p>Manage accounts, fetch locations, update business hours, and handle special hours effortlessly across multiple locations.</p>
  </div>
  <div class="feature-card">
    <h3>🍔 Services & Menus</h3>
    <p>Full support for FoodMenus and Service APIs. Build strict TypeScript menus with dietary labels, allergens, and nutritional facts.</p>
  </div>
  <div class="feature-card">
    <h3>⭐ Reviews & Posts</h3>
    <p>Reply to customer reviews, fetch metrics, and publish local posts, offers, or event updates directly to Google.</p>
  </div>
  <div class="feature-card">
    <h3>✨ Attributes & Amenities</h3>
    <p>Patch specific location attributes safely. Handle complex amenities like accessibility, dining options, and service flags.</p>
  </div>
  <div class="feature-card">
    <h3>✅ Verifications & Chains</h3>
    <p>Trigger PIN/SMS verifications programmatically and associate your unverified locations with official global Chains.</p>
  </div>
  <div class="feature-card">
    <h3>📸 Media Uploads</h3>
    <p>Upload photos and videos directly to Google’s v4 endpoints and manage category tags seamlessly.</p>
  </div>
</div>

## 💡 Why use this SDK?

Instead of struggling with raw Google APIs, REST endpoints, and manual token refreshing, this SDK provides an enterprise-ready DX:

<div class="grid-container">
  <div class="feature-card">
    <h3>🔐 Built-in Auth</h3>
    <p>Zero-config OAuth 2.0 flow with intelligent token refreshing and pluggable file/memory storage. Never write a token refresh loop again.</p>
  </div>
  <div class="feature-card">
    <h3>📑 Auto Pagination</h3>
    <p>Stop writing boilerplate loops. The SDK automatically traverses <code>nextPageToken</code> to fetch thousands of records across pages instantly.</p>
  </div>
  <div class="feature-card">
    <h3>🛡️ Strict TypeScript Types</h3>
    <p>100% typed request/response bodies. Catch errors at compile time when writing food menus, attributes, or verification options.</p>
  </div>
  <div class="feature-card">
    <h3>🚦 Smart Rate Limiting</h3>
    <p>Built-in exponential backoff and automatic retry logic for 429 and 5xx errors, ensuring your enterprise workflows don't crash.</p>
  </div>
  <div class="feature-card">
    <h3>🌐 Unified Services API</h3>
    <p>We abstract away Google's fragmented APIs into a single unified client supporting locations, verifications, media, and more.</p>
  </div>
</div>

---

## 🚀 Quick Start in 3 Steps

<div class="step-card">
  <span class="step-number">Step 1: Install the SDK</span>
  <p>Install via your favorite package manager.</p>

::: code-group

```bash [npm]
npm install @vitabletech/gbp-sdk
```

```bash [yarn]
yarn add @vitabletech/gbp-sdk
```

```bash [pnpm]
pnpm add @vitabletech/gbp-sdk
```

:::

</div>

<div class="step-card">
  <span class="step-number">Step 2: Configure OAuth</span>
  <p>Initialize the client with your Google Cloud credentials.</p>

```typescript
import { GBPClient } from '@vitabletech/gbp-sdk';

const client = new GBPClient({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/oauth/callback',
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN, // Optional
});
```

</div>

<div class="step-card">
  <span class="step-number">Step 3: Call the SDK</span>
  <p>You're ready! Start calling any GBP service with automatic token management.</p>

```typescript
// Fetch all locations for a specific account (auto-paginated)
const locations = await client.locations.listAll('accounts/1234567890');

// Update a location's attributes
await client.attributes.patchAttributes(locations[0].name, {
  attributes: [{ name: 'has_delivery', valueType: 'BOOL', values: [true] }],
});
```

</div>

---

## 🎉 What's New in v{{ version }}

::: info 🚀 **Massive API Expansion & Stable Release!**
Version {{ version }} is our official production-ready release, bringing native support for some of Google's most powerful enterprise APIs.
:::

- **[Verifications API](/api-reference/verifications)**: Trigger phone, SMS, and postcard verifications natively (`mybusinessverifications.googleapis.com`).
- **[Quotas API](/api-reference/quotas)**: Programmatically check your API Quotas to avoid hitting rate limits (`serviceusage.googleapis.com`).
- **[Chains API](/api-reference/chains)**: Search global brands and associate your locations with corporate chains effortlessly.
- **[Location Attributes](/guides/patch-vs-patchAttributes)**: Manage location amenities, flags, and attributes easily. Check out our guide on [`patchAttributes` vs `updateLocationAttributes`](/guides/patch-vs-patchAttributes) to choose the best method.
- **Media Upload Upgrades**: The `MediaService` now fully supports Google's v4 endpoints and allows category updates via `patch()`.
- **Enterprise Ready**: Added comprehensive [Network Whitelist](/advanced/network-whitelist) documentation to help enterprise IT teams unblock necessary domains.

---

## 📚 Popular Guides

<div class="grid-container">
  <a href="/api-reference/locations" class="feature-card feature-link">
    <h3>📍 Locations & Profiles &rarr;</h3>
  </a>
  <a href="/api-reference/reviews" class="feature-card feature-link">
    <h3>💬 Reviews Management &rarr;</h3>
  </a>
  <a href="/api-reference/posts" class="feature-card feature-link">
    <h3>📰 Local Posts &rarr;</h3>
  </a>
  <a href="/api-reference/attributes" class="feature-card feature-link">
    <h3>✨ Location Attributes &rarr;</h3>
  </a>
  <a href="/api-reference/media" class="feature-card feature-link">
    <h3>📸 Media Uploads &rarr;</h3>
  </a>
  <a href="/api-reference/verifications" class="feature-card feature-link">
    <h3>✅ Verifications API &rarr;</h3>
  </a>
</div>
