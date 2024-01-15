# Accounts

## Introduction
The `AccountsService` provides methods to interact with Google Business Profile Accounts. An Account represents a business entity or user and is the top-level parent container for all Locations.

You can access this service via `client.accounts`.

### Official Documentation
[Google Business Profile: Account Management API Reference](https://developers.google.com/my-business/reference/accountmanagement/rest/v1/accounts)

---

## Methods

### `listAll()`

#### Purpose
Fetches all Google Business Profile accounts accessible by the authenticated user. This method automatically handles pagination for you, so you do not need to deal with `pageToken`.

#### Syntax
```typescript
async client.accounts.listAll(): Promise<Account[]>
```

#### Request Example
```typescript
const accounts = await client.accounts.listAll();
console.log(`Found ${accounts.length} accounts`);
```

#### Expected Response
Returns an array of `Account` objects.
```json
[
  {
    "name": "accounts/111222333",
    "accountName": "Vitabletech Global",
    "type": "PERSONAL",
    "verificationState": "VERIFIED"
  },
  {
    "name": "accounts/444555666",
    "accountName": "Vitabletech US Hub",
    "type": "LOCATION_GROUP",
    "verificationState": "UNVERIFIED"
  }
]
```

#### Error Examples

| Error Class | Status Code | Reason |
| --- | --- | --- |
| `AuthenticationError` | 401 | Your OAuth token is expired and could not be refreshed. |
| `RateLimitError` | 429 | You have exceeded your Google API quota limit. |

#### Notes
- If a user has no accounts, it returns an empty array `[]`.
- It might take several seconds to execute if the user has hundreds of accounts, as the SDK makes multiple paginated calls behind the scenes.

### `list(options)`

#### Purpose
Fetches a single paginated chunk of accounts. Use this if you want manual control over the pagination token.

#### Syntax
```typescript
async client.accounts.list(options?: { pageToken?: string }): Promise<any>
```

### `get(accountId)`

#### Purpose
Fetches a specific account by its ID.

#### Syntax
```typescript
async client.accounts.get(accountId: string): Promise<any>
```

#### Related APIs
- [Locations `listAll()`](/api-reference/locations)
- [Google API Documentation: accounts.list](https://developers.google.com/my-business/reference/accountmanagement/rest/v1/accounts/list)
