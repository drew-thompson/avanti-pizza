export interface Message {
  message: string;
}

export type PizzaSize = 'slice' | '12' | '14' | '16' | '18';

export type PricingChart = { [T in PizzaSize]: number };

export interface BasePricing {
  cost: number;
  toppingCost: number;
}

export type BasePricingChart = { [T in PizzaSize]: BasePricing };

export interface Topping {
  /** The name of the topping. */
  name?: ToppingName;
  /** Whether the topping will be billed as a premium ingredient. */
  premium: boolean;
  /** Whether the topping is included in the recipe without charge. */
  included?: boolean;
}

export interface Pizza {
  name: PizzaName;
  description: string;
  thin: boolean;
  pricing?: PricingChart;
  toppings?: Topping[];
}

export interface PizzaMenu {
  [name: string]: Pizza;
}

export type Sauce =
  | 'House Pizza Sauce'
  | 'Honey Barbeque Sauce'
  | 'Savory Garlic Sauce'
  | 'Piccante Sauce'
  | 'Basil Pesto Sauce'
  | 'Ranch Sauce';

export type ToppingName =
  | 'Anchovies'
  | 'Artichoke Hearts'
  | 'Baby Arugula'
  | 'Bacon'
  | 'Basil'
  | 'Bell Peppers'
  | 'Black Olives'
  | 'Broccoli'
  | 'Capers'
  | 'Caramelized Onion'
  | 'Carrot'
  | 'Chicken Apple Sausage'
  | 'Clams'
  | 'Feta Cheese'
  | 'Garlic'
  | 'Goat Cheese'
  | 'Gorgonzola Cheese'
  | 'Grilled Chicken'
  | 'Ground Beef'
  | 'Ham'
  | 'Italian Sausage'
  | 'Jalapeños'
  | 'Kalamata Olives'
  | 'Meatball'
  | 'Mushrooms'
  | 'Onion'
  | 'Oregano'
  | 'Pepperoni'
  | 'Pesto'
  | 'Pineapple'
  | 'Red Onion'
  | 'Ricotta Cheese'
  | 'Roasted Eggplant'
  | 'Roasted Red Peppers'
  | 'Salami'
  | 'Spinach'
  | 'Sun-dried Tomatoes'
  | 'Tomatoes'
  | 'Zucchini'
  | 'Cilantro'
  | Sauce;

export type PizzaName =
  | 'BBQ Chicken'
  | 'Italian Blues'
  | "Ivan's Special"
  | "Lily's Special"
  | 'Margherita'
  | 'Mollusco'
  | 'Piccante'
  | 'Belmont'
  | 'Combo'
  | 'Garden Veggie'
  | 'Greek Special'
  | 'Hawaiian'
  | "Meat Lover's"
  | "Lito's Special"
  | 'Tuscan Chicken'
  | 'Veggie Italiano';

export type BeerType = 'Imported' | 'Domestic' | 'IPA';
export type BeerTypePricing = { [T in BeerType]: number };

export type BeerName =
  | 'Heineken'
  | 'Bud Light'
  | 'Coors Light'
  | 'Budweiser'
  | 'Pacifico'
  | 'Victoria'
  | 'Dos Equis'
  | 'Negra Modelo'
  | 'Corona'
  | 'Bud Light'
  | 'Coors Light'
  | 'Budweiser'
  | 'Lagunitas IPA'
  | 'Sierra Nevada Pale Ale';

export interface Beer {
  name: BeerName;
  type: BeerType;
  cost?: number;
}

export type BeverageName =
  | 'Water'
  | 'Coke'
  | 'Diet Coke'
  | 'Pepsi'
  | 'Diet Pepsi'
  | 'A&W Rootbeer'
  | 'Diet A&W Rootbeer'
  | 'Mug Rootbeer'
  | '7up'
  | 'Diet 7up'
  | 'Crush'
  | 'Nestea'
  | 'Kerns'
  | 'Snapple'
  | 'Gatorage'
  | 'Orange Juice'
  | 'Mango Juice'
  | 'Cranberry Juice'
  | 'Mexican Coke'
  | 'Two Liter Soda';

export interface Beverage {
  name: BeverageName;
  cost: number;
}
export type DrinkName = BeerName | BeverageName;
export type Drink = Beer | Beverage;
export type DrinkAutocompleteType = 'beers' | 'beverages';
