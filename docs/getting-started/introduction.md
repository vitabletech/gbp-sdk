---
description: 'Welcome to the **@vitabletech/gbp-sdk** documentation.'
---

# Introduction

Welcome to the **@vitabletech/gbp-sdk** documentation.

This SDK is a robust, enterprise-grade, strongly-typed Node.js client for the Google Business Profile (GBP) APIs. It abstracts away the complexity of Google's OAuth 2.0 flows, pagination logic, and rate limit retries so you can focus on building your business logic.

## What is this?

The GBP SDK is a TypeScript library that provides a unified, programmatic interface to interact with Google Business Profiles. It replaces raw `fetch` calls or the convoluted `@googleapis/mybusiness` generated libraries with a clean, object-oriented API.

This SDK allows you to programmatically manage exactly what your customers see when they search for your business on Google:

<div style="margin-top: 15px; margin-bottom: 25px;">
  <img src="/knowledge-panel.png" alt="Google Business Profile Knowledge Panel Example" style="border-radius: 8px; border: 1px solid #ccc; max-width: 100%; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</div>

## Why should I use it?

- **Automatic OAuth 2.0**: Handles token generation, storage, and automatic refreshing behind the scenes.
- **Auto Pagination**: Methods like `listAll()` abstract away `pageToken` loops, automatically fetching all resources.
- **Enterprise Ready**: Built-in exponential backoff, retry policies, and comprehensive error handling.
- **TypeScript First**: Full IntelliSense support and strict typing for request payloads and Google API responses.

## Prerequisites

Before you can use the SDK, you must have an approved Google Cloud Project. Please read our detailed [Prerequisites & API Access Guide](/getting-started/prerequisites) to learn how to apply for access or how to generate a temporary token using the OAuth Playground.

## Next Steps

After reviewing the prerequisites, continue to [Installation](/getting-started/installation) to install the SDK, or jump straight to [Authentication](/getting-started/authentication) to learn how to securely connect to Google.
