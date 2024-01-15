# Express.js Integration

Here is a complete, production-ready example of how to integrate the `@vitabletech/gbp-sdk` into an Express.js application to handle the OAuth 2.0 flow and fetch data.

This example uses Memory Storage for simplicity, but in a real production app with multiple servers, you should implement a custom database-backed `TokenStorage`.

## Example Code

```typescript
import express from 'express';
import { GBPClient, AuthenticationError } from '@vitabletech/gbp-sdk';

const app = express();
const PORT = 3000;

// 1. Initialize the SDK
const client = new GBPClient({
  clientId: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
  redirectUri: `http://localhost:${PORT}/oauth/callback`,
  tokenStorage: 'memory'
});

// 2. Route to start the login process
app.get('/login', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/business.manage'
  ];
  
  // Generate the Google OAuth URL and redirect the user
  const authUrl = client.getAuthorizationUrl(scopes, 'optional-state');
  res.redirect(authUrl);
});

// 3. Route to handle the Google callback
app.get('/oauth/callback', async (req, res) => {
  const code = req.query.code as string;
  
  if (!code) {
    return res.status(400).send('No authorization code provided');
  }

  try {
    // Exchange the code for an Access Token and Refresh Token.
    // The SDK automatically saves them to the configured TokenStorage!
    await client.processAuthCode(code);
    
    res.send('Login successful! <a href="/accounts">View Accounts</a>');
  } catch (error) {
    console.error('OAuth Callback Error:', error);
    res.status(500).send('Failed to authenticate with Google');
  }
});

// 4. Protected Route that actually uses the API
app.get('/accounts', async (req, res) => {
  try {
    // The SDK automatically attaches the access token.
    // If it's expired, it automatically refreshes it first!
    const accounts = await client.accounts.listAll();
    
    res.json(accounts);
  } catch (error) {
    if (error instanceof AuthenticationError) {
      // Token is missing or refresh token was revoked
      return res.redirect('/login');
    }
    
    console.error('API Error:', error);
    res.status(500).send('Failed to fetch accounts');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Go to http://localhost:${PORT}/login to start!`);
});
```
