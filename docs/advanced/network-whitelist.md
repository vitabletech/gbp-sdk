# GBP SDK Network Whitelist

If you are running the `@vitabletech/gbp-sdk` behind a strict corporate firewall, you will need to ensure that the following domains and URLs are whitelisted for outbound traffic (HTTPS on port 443).

## Google Business Profile APIs (Data & Management)

These endpoints are used to fetch and mutate data related to locations, categories, accounts, and reviews.

- **Locations & Categories**
  - Domain: `mybusinessbusinessinformation.googleapis.com`
  - Base URL: `https://mybusinessbusinessinformation.googleapis.com/v1/`

- **Accounts Management**
  - Domain: `mybusinessaccountmanagement.googleapis.com`
  - Base URL: `https://mybusinessaccountmanagement.googleapis.com/v1/`

- **Reviews & Core Business APIs**
  - Domain: `mybusiness.googleapis.com`
  - Base URL: `https://mybusiness.googleapis.com/v4/`

## Google OAuth & Authentication

These endpoints are used to manage authentication, generate tokens, refresh expired tokens, and validate token status.

- **OAuth Consent & Authorization**
  - Domain: `accounts.google.com`
  - Base URL: `https://accounts.google.com/o/oauth2/v2/auth`

- **Token Generation & Refresh**
  - Domain: `oauth2.googleapis.com`
  - Base URL: `https://oauth2.googleapis.com/token`
  - Token Validation: `https://oauth2.googleapis.com/tokeninfo`

---

**Summary of Domains to Whitelist (Port 443):**

- `mybusinessbusinessinformation.googleapis.com`
- `mybusinessaccountmanagement.googleapis.com`
- `mybusiness.googleapis.com`
- `accounts.google.com`
- `oauth2.googleapis.com`
