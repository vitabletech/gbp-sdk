# Chains Service

## Introduction

The `ChainsService` allows you to find and retrieve global brands/chains (e.g., Starbucks, Walmart) that your business locations might be affiliated with.

When a location is properly linked to a known Chain, Google automatically applies appropriate brand consistency (like logos) across all locations belonging to that chain.

You can access this service via `client.chains`.

### Official Documentation

[Google Business Profile: Chains API Reference](https://developers.google.com/my-business/reference/businessinformation/rest/v1/chains)

---

## Methods

### `search(query, pageSize?)`

Searches for chains by their name.

```typescript
const response = await client.chains.search('Starbucks');

if (response.chains && response.chains.length > 0) {
  console.log(`Found ${response.chains.length} matching chains.`);
  console.log(
    `Top match: ${response.chains[0].name} (${response.chains[0].chainNames?.[0].displayName})`
  );
}
```

### `get(chainName)`

Gets a specific chain by its resource name (ID).

```typescript
// Pass the full resource name or just the ID
const chain = await client.chains.get('chains/123456789');

console.log('Chain Name:', chain.chainNames?.[0].displayName);
console.log('Total Locations Globally:', chain.locationCount);
```
