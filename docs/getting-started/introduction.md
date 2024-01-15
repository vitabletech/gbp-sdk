# Introduction

Welcome to the **@vitabletech/gbp-sdk** documentation. 

This SDK is a robust, enterprise-grade, strongly-typed Node.js client for the Google Business Profile (GBP) APIs. It abstracts away the complexity of Google's OAuth 2.0 flows, pagination logic, and rate limit retries so you can focus on building your business logic.

## What is this?
The GBP SDK is a TypeScript library that provides a unified, programmatic interface to interact with Google Business Profiles. It replaces raw `fetch` calls or the convoluted `@googleapis/mybusiness` generated libraries with a clean, object-oriented API.

## Why should I use it?
- **Automatic OAuth 2.0**: Handles token generation, storage, and automatic refreshing behind the scenes.
- **Auto Pagination**: Methods like `listAll()` abstract away `pageToken` loops, automatically fetching all resources.
- **Enterprise Ready**: Built-in exponential backoff, retry policies, and comprehensive error handling.
- **TypeScript First**: Full IntelliSense support and strict typing for request payloads and Google API responses.

## Prerequisites
Before you begin, you will need:
1. Node.js `v18.0.0` or higher.
2. A Google Cloud Platform (GCP) project with the **Google Business Profile API** enabled.
3. An OAuth 2.0 Client ID and Client Secret.

## Next Steps
Continue to [Installation](/getting-started/installation) to install the SDK, or jump straight to [Authentication](/getting-started/authentication) to learn how to securely connect to Google.
