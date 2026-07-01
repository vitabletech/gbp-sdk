# Food Menus (Types)

## Introduction

The SDK currently provides complete, strict TypeScript definitions for the Google Business Profile **FoodMenus API**.
While a dedicated service wrapper is in development, you can use these types alongside the `client.request()` method or any custom implementation to ensure full type-safety.

### Official Documentation

[Google Business Profile: FoodMenus API Reference](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.foodMenus)

---

## Usage

You can import all `FoodMenu` related types and enums directly from the SDK:

```typescript
import {
  FoodMenu,
  FoodMenuItem,
  NutritionFacts,
  Spiciness,
  DietaryRestriction,
} from '@vitabletech/gbp-sdk';
```

### Example with Generic Request

Since the `FoodMenusService` is currently being implemented, you can use the built-in generic `request()` method combined with these strong types:

```typescript
import { FoodMenus } from '@vitabletech/gbp-sdk';

// Fetch Food Menus for a location
const response = await client.request({
  method: 'GET',
  url: `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/foodMenus`,
});

// Type-cast the response to our strong type
const foodMenus = response.data as FoodMenus;

console.log('Menu Sections:', foodMenus.menus?.[0].sections.length);
```

---

## Key Interfaces and Enums

The SDK exports the following primary types based on Google's official schema:

- **`FoodMenus`**: The root object containing an array of `FoodMenu`.
- **`FoodMenu`**: A specific menu (e.g., Lunch, Dinner) containing `FoodMenuSection`s.
- **`FoodMenuSection`**: A section (e.g., Starters, Mains) containing `FoodMenuItem`s.
- **`FoodMenuItem`**: The actual dish, complete with `FoodMenuItemAttributes`.
- **`FoodMenuItemAttributes`**: Detailed properties like `price`, `spiciness`, `allergens`, `dietaryRestrictions`, and `nutritionFacts`.
- **`NutritionFacts`**: Caloric and nutritional data.

### Enums Available

- `Spiciness`
- `Allergen`
- `DietaryRestriction`
- `EnergyUnit`
- `MassUnit`
- `PreparationMethod`
- `Cuisine`
