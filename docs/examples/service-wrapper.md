# Service Wrapper Pattern

In many backend applications, it's best practice to encapsulate the SDK logic within a single "Service" or "Wrapper" file. This keeps your route handlers clean and centralizes your Google Business Profile (GBP) logic.

## Example: `gbpService.js`

```javascript
const { GBPClient, FileTokenStorage, ConsoleLogger } = require('@vitabletech/gbp-sdk');
const path = require('path');
const fs = require('fs');

// 1. Configure where tokens will be stored securely on the server
const TOKENS_FILE = path.join(__dirname, '../data/gbp-token.json');
const tokenStorage = new FileTokenStorage(TOKENS_FILE);

// 2. Initialize the GBP Client
const client = new GBPClient({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI,
  tokenStorage: tokenStorage,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN, // Optional: if already known
  logger: new ConsoleLogger(),
});

/**
 * ==========================================
 * AUTHENTICATION METHODS
 * ==========================================
 */

/**
 * Check if the application already has tokens saved.
 */
const hasValidTokens = () => fs.existsSync(TOKENS_FILE);

/**
 * Generate the Google OAuth2 login URL.
 * Redirect the user to this URL to start the OAuth flow.
 */
const getAuthUrl = () => {
  return client.getAuthorizationUrl(['https://www.googleapis.com/auth/business.manage']);
};

/**
 * Exchange the authorization code (received after user login) for tokens.
 * The SDK will automatically save them to the TokenStorage.
 */
const processLoginCode = async (code) => {
  await client.processAuthCode(code);
  const accessToken = await tokenStorage.getToken();
  const refreshToken = await tokenStorage.getRefreshToken();
  
  return { accessToken, refreshToken, success: true };
};

/**
 * Clear all tokens and delete the token file.
 * Useful for a "Logout" endpoint.
 */
const logout = async () => {
  await tokenStorage.clearTokens();
  if (fs.existsSync(TOKENS_FILE)) {
    fs.unlinkSync(TOKENS_FILE);
  }
};

/**
 * ==========================================
 * BUSINESS PROFILE METHODS
 * ==========================================
 */

/**
 * Fetch all Accounts the user has access to.
 */
const getAllAccounts = async () => {
  const accounts = await client.accounts.listAll();
  return accounts;
};

/**
 * Fetch Locations for a specific Account with pagination support.
 */
let locationPaginator = null;
const getLocations = async (accountIdOrName) => {
  // Initialize paginator if it doesn't exist
  if (!locationPaginator) {
    locationPaginator = client.locations.listPaginator(accountIdOrName, { pageSize: 10 });
  }
  
  const locations = await locationPaginator.next();
  return { 
    locations,
    hasMore: locationPaginator.hasMore 
  };
};

/**
 * Fetch a specific Location by its resource name.
 */
const getLocationByName = async (locationName, readMask) => {
  return client.locations.get(locationName, { readMask });
};

/**
 * Create a new Location under a specific Account.
 */
const createNewLocation = async (accountIdOrName, locationData, options) => {
  return client.locations.create(accountIdOrName, locationData, options);
};

/**
 * Update an existing Location.
 */
const updateLocationData = async (locationId, data, updateMask) => {
  return client.locations.patch(locationId, data, updateMask);
};

/**
 * Fetch Reviews for a specific Location with pagination support.
 */
let reviewPaginator = null;
const getReviews = async (accountIdOrName, locationIdOrName) => {
  if (!reviewPaginator) {
    reviewPaginator = client.reviews.listPaginator(accountIdOrName, locationIdOrName, { pageSize: 10 });
  }
  
  const reviews = await reviewPaginator.next();
  return { 
    reviews,
    hasMore: reviewPaginator.hasMore 
  };
};

/**
 * ==========================================
 * EXPORT SERVICE
 * ==========================================
 */
module.exports = {
  // Auth
  hasValidTokens,
  getAuthUrl,
  processLoginCode,
  logout,
  
  // Accounts
  getAllAccounts,
  
  // Locations
  getLocations,
  getLocationByName,
  createNewLocation,
  updateLocationData,
  
  // Reviews
  getReviews,
  
  // Raw Client Access
  client
};
```

## How to use this in a Controller

Now, your Express or Node.js controllers can stay incredibly clean:

```javascript
const gbpService = require('../services/gbpService');

app.get('/login', (req, res) => {
  if (gbpService.hasValidTokens()) {
    return res.send('Already logged in!');
  }
  res.redirect(gbpService.getAuthUrl());
});

app.get('/accounts', async (req, res) => {
  try {
    const accounts = await gbpService.getAllAccounts();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```
