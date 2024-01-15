# Categories

## Introduction
The `CategoriesService` allows you to search and list the business categories supported by Google. These categories are required when creating or updating a Location.

You can access this service via `client.categories`.

### Official Documentation
[Google Business Profile: Categories API Reference](https://developers.google.com/my-business/reference/businessinformation/rest/v1/categories)

---

## Methods

### `list(options)`

#### Purpose
Returns a list of categories supported by Google Business Profile.

#### Syntax
```typescript
async client.categories.list(options?: { 
  languageCode?: string; 
  view?: string; 
  pageToken?: string 
}): Promise<any>
```

### `search(options)`

#### Purpose
Searches for categories matching a specific search term. This is highly useful for building a category autocomplete feature in your UI.

#### Syntax
```typescript
async client.categories.search(options: { 
  searchTerm?: string; 
  languageCode?: string; 
  regionCode?: string; 
  view?: string; 
  pageToken?: string 
}): Promise<any>
```

#### Request Example
```typescript
const response = await client.categories.search({
  searchTerm: 'Restaurant',
  languageCode: 'en',
  regionCode: 'US'
});

console.log(response.categories);
```
