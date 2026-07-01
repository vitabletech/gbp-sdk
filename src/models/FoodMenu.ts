export interface FoodMenus {
  /** Google identifier for this location in the form: accounts/{accountId}/locations/{locationId}/foodMenus */
  name: string;
  /** A collection of food menus. */
  menus?: FoodMenu[];
}

export interface FoodMenu {
  /** Language-tagged labels for the menu. E.g. "menu", "lunch special". */
  labels: MenuLabel[];
  /** Source URL of menu if there is a webpage to go to. */
  sourceUrl?: string;
  /** Sections of the menu. */
  sections: FoodMenuSection[];
  /** Cuisine information for the food menu. */
  cuisines?: Cuisine[];
}

export interface MenuLabel {
  /** Display name of the component. */
  displayName: string;
  /** Supplementary information of the component. */
  description?: string;
  /** The BCP 47 code of language. If the language is not available, it will default to English. */
  languageCode?: string;
}

export interface FoodMenuSection {
  /** Language tagged labels for this menu section. */
  labels: MenuLabel[];
  /** Items of the section. Each Section must have at least an item. */
  items: FoodMenuItem[];
}

export interface FoodMenuItem {
  /** Language tagged labels for this menu item. */
  labels: MenuLabel[];
  /** Detailed attributes of the item. */
  attributes: FoodMenuItemAttributes;
  /** This is for an item that comes in multiple different options. */
  options?: FoodMenuItemOption[];
}

export interface FoodMenuItemAttributes {
  /** Price of the food dish. */
  price: Money;
  /** Spiciness level of the food dish. */
  spiciness?: Spiciness;
  /** Allergens associated with the food dish. */
  allergen?: Allergen[];
  /** Dietary information of the food dish. */
  dietaryRestriction?: DietaryRestriction[];
  /** Nutrition facts of the food dish option. */
  nutritionFacts?: NutritionFacts;
  /** Ingredients of the food dish option. */
  ingredients?: Ingredient[];
  /** Number of people can be served by this food dish option. */
  servesNumPeople?: number;
  /** Methods on how the food dish option is prepared. */
  preparationMethods?: PreparationMethod[];
  /** Size of the order, represented in units of items. */
  portionSize?: PortionSize;
  /** The media keys of the media associated with the dish. Only photo media is supported. */
  mediaKeys?: string[];
}

/** Represents an amount of money with its currency type. */
export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode: string;
  /** The whole units of the amount. */
  units: string;
  /** Number of nano (10^-9) units of the amount. */
  nanos: number;
}

export enum Spiciness {
  SPICINESS_UNSPECIFIED = 'SPICINESS_UNSPECIFIED',
  MILD = 'MILD',
  MEDIUM = 'MEDIUM',
  HOT = 'HOT',
}

export enum Allergen {
  ALLERGEN_UNSPECIFIED = 'ALLERGEN_UNSPECIFIED',
  DAIRY = 'DAIRY',
  EGG = 'EGG',
  FISH = 'FISH',
  PEANUT = 'PEANUT',
  SHELLFISH = 'SHELLFISH',
  SOY = 'SOY',
  TREE_NUT = 'TREE_NUT',
  WHEAT = 'WHEAT',
}

export enum DietaryRestriction {
  DIETARY_RESTRICTION_UNSPECIFIED = 'DIETARY_RESTRICTION_UNSPECIFIED',
  HALAL = 'HALAL',
  KOSHER = 'KOSHER',
  ORGANIC = 'ORGANIC',
  VEGAN = 'VEGAN',
  VEGETARIAN = 'VEGETARIAN',
}

export interface NutritionFacts {
  calories?: CaloriesFact;
  totalFat?: NutritionFact;
  cholesterol?: NutritionFact;
  sodium?: NutritionFact;
  totalCarbohydrate?: NutritionFact;
  protein?: NutritionFact;
}

export interface CaloriesFact {
  lowerAmount: number;
  upperAmount?: number;
  unit: EnergyUnit;
}

export enum EnergyUnit {
  ENERGY_UNIT_UNSPECIFIED = 'ENERGY_UNIT_UNSPECIFIED',
  CALORIE = 'CALORIE',
  JOULE = 'JOULE',
}

export interface NutritionFact {
  lowerAmount: number;
  upperAmount?: number;
  unit: MassUnit;
}

export enum MassUnit {
  MASS_UNIT_UNSPECIFIED = 'MASS_UNIT_UNSPECIFIED',
  GRAM = 'GRAM',
  MILLIGRAM = 'MILLIGRAM',
}

export interface Ingredient {
  labels: MenuLabel[];
}

export enum PreparationMethod {
  PREPARATION_METHOD_UNSPECIFIED = 'PREPARATION_METHOD_UNSPECIFIED',
  BAKED = 'BAKED',
  BARBECUED = 'BARBECUED',
  BASTED = 'BASTED',
  BLANCHED = 'BLANCHED',
  BOILED = 'BOILED',
  BRAISED = 'BRAISED',
  CODDLED = 'CODDLED',
  FERMENTED = 'FERMENTED',
  FRIED = 'FRIED',
  GRILLED = 'GRILLED',
  KNEADED = 'KNEADED',
  MARINATED = 'MARINATED',
  PAN_FRIED = 'PAN_FRIED',
  PICKLED = 'PICKLED',
  PRESSURE_COOKED = 'PRESSURE_COOKED',
  ROASTED = 'ROASTED',
  SAUTEED = 'SAUTEED',
  SEARED = 'SEARED',
  SIMMERED = 'SIMMERED',
  SMOKED = 'SMOKED',
  STEAMED = 'STEAMED',
  STEEPED = 'STEEPED',
  STIR_FRIED = 'STIR_FRIED',
  OTHER_METHOD = 'OTHER_METHOD',
}

export interface PortionSize {
  quantity: number;
  unit: MenuLabel[];
}

export interface FoodMenuItemOption {
  labels: MenuLabel[];
  attributes: FoodMenuItemAttributes;
}

export enum Cuisine {
  CUISINE_UNSPECIFIED = 'CUISINE_UNSPECIFIED',
  AMERICAN = 'AMERICAN',
  ASIAN = 'ASIAN',
  BRAZILIAN = 'BRAZILIAN',
  BREAK_FAST = 'BREAK_FAST',
  BRUNCH = 'BRUNCH',
  CHICKEN = 'CHICKEN',
  CHINESE = 'CHINESE',
  FAMILY = 'FAMILY',
  FAST_FOOD = 'FAST_FOOD',
  FRENCH = 'FRENCH',
  GREEK = 'GREEK',
  GERMAN = 'GERMAN',
  HAMBURGER = 'HAMBURGER',
  INDIAN = 'INDIAN',
  INDONESIAN = 'INDONESIAN',
  ITALIAN = 'ITALIAN',
  JAPANESE = 'JAPANESE',
  KOREAN = 'KOREAN',
  LATIN_AMERICAN = 'LATIN_AMERICAN',
  MEDITERRANEAN = 'MEDITERRANEAN',
  MEXICAN = 'MEXICAN',
  PAKISTANI = 'PAKISTANI',
  PIZZA = 'PIZZA',
  SEAFOOD = 'SEAFOOD',
  SPANISH = 'SPANISH',
  SUSHI = 'SUSHI',
  THAI = 'THAI',
  TURKISH = 'TURKISH',
  VEGETARIAN = 'VEGETARIAN',
  VIETNAMESE = 'VIETNAMESE',
  OTHER_CUISINE = 'OTHER_CUISINE',
}
