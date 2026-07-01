---
layout: home

hero:
  name: 'Google Business Profile'
  text: 'Enterprise Node.js SDK'
  tagline: 'The most complete TypeScript SDK for the Google Business Profile APIs. Build powerful location management apps with zero-config OAuth, auto-pagination, and strict type safety.'
  image:
    src: /hero-graphic.webp
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

features:
  - title: 🔐 Zero-Config Authentication
    details: Fully automated OAuth 2.0 flow with intelligent token refreshing and pluggable file/memory storage.
    link: /getting-started/authentication
  - title: 📑 Auto Pagination
    details: Stop writing boilerplate loops. Automatically traverse `nextPageToken` to fetch thousands of records instantly.
    link: /guides/pagination
  - title: 🚀 Future-Proof API
    details: Generic request client lets you access brand new Google endpoints the exact day they are released.
    link: /guides/custom-requests
  - title: 🛡️ Strict Type Safety
    details: Comprehensive TypeScript definitions for all endpoints to catch errors at compile time, not runtime.
  - title: 🚦 Smart Rate Limiting
    details: Built-in exponential backoff and automatic retry logic for 429 and 5xx errors.
    link: /guides/error-handling
  - title: 🔌 Powerful Middleware
    details: Intercept requests and responses globally to add custom logging, metrics, or data transformations.
    link: /guides/middleware
---

<div align="center" style="margin-top: 2rem; margin-bottom: 2rem; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
  <a href="https://www.npmjs.com/package/@vitabletech/gbp-sdk"><img src="https://img.shields.io/npm/v/@vitabletech/gbp-sdk?style=for-the-badge&color=cb3837" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/@vitabletech/gbp-sdk"><img src="https://img.shields.io/npm/types/@vitabletech/gbp-sdk?style=for-the-badge&color=3178c6" alt="TypeScript" /></a>
  <a href="https://github.com/vitabletech/gbp-sdk/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@vitabletech/gbp-sdk?style=for-the-badge&color=4caf50" alt="License" /></a>
</div>

## 📦 Quick Installation

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

---

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

/* 2. Pulsing Glow behind the Hero Image */
.VPHero .image-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0) 70%);
  filter: blur(40px);
  z-index: -1;
  animation: pulse 4s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
}

/* 3. Infinite Marquee Animation */
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
</style>

<div class="marquee-wrapper">
  <div class="marquee-content">
    <!-- First set -->
    <span class="marquee-item">🚀 v1.0.0 is LIVE!</span>
    <span class="marquee-item">✅ Native Verifications API</span>
    <span class="marquee-item">🔗 Official Chains API</span>
    <span class="marquee-item">🍔 Food Menus Types</span>
    <span class="marquee-item">📊 v1 Performance Metrics</span>
    <span class="marquee-item">🤖 Auto-Pagination Built-in!</span>
    <!-- Duplicate set for seamless scrolling -->
    <span class="marquee-item">🚀 v1.0.0 is LIVE!</span>
    <span class="marquee-item">✅ Native Verifications API</span>
    <span class="marquee-item">🔗 Official Chains API</span>
    <span class="marquee-item">🍔 Food Menus Types</span>
    <span class="marquee-item">📊 v1 Performance Metrics</span>
    <span class="marquee-item">🤖 Auto-Pagination Built-in!</span>
  </div>
</div>

---

## 🎉 What's New in v1.0.0

::: info 🚀 **Massive API Expansion & Stable Release!**
Version 1.0.0 is our official production-ready release, bringing native support for some of Google's most powerful enterprise APIs.
:::

- **[Verifications API](/api-reference/verifications)**: Trigger phone, SMS, and postcard verifications natively (`mybusinessverifications.googleapis.com`).
- **[Chains API](/api-reference/chains)**: Search global brands and associate your locations with corporate chains effortlessly.
- **[Location Attributes](/api-reference/locations)**: Manage location amenities, flags, and attributes easily with `patchAttributes`.
- **Media Upload Upgrades**: The `MediaService` now fully supports Google's v4 endpoints and allows category updates via `patch()`.
- **Enterprise Ready**: Added comprehensive [Network Whitelist](/advanced/network-whitelist) documentation to help enterprise IT teams unblock necessary domains.

---

## ⚡ Quick Example

Get up and running in less than 10 lines of code. The SDK handles the rest.

```typescript
import { GBPClient } from '@vitabletech/gbp-sdk';

const client = new GBPClient({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/oauth/callback',
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
});

// Automatically handles tokens, paginates through all pages,
const accounts = await client.accounts.listAll();
```
