export interface Message {
  message: string;
}

export type PizzaSize = 'slice' | '12' | '14' | '16' | '18';

export interface PricingChart {
  slice?: number;
  '12': number;
  '14': number;
  '16': number;
  '18': number;
}

export interface BasePricingChart {
  slice?: BasePricing;
  '12': BasePricing;
  '14': BasePricing;
  '16': BasePricing;
  '18': BasePricing;
}

export interface BasePricing {
  cost: number;
  toppingCost: number;
}

export interface Topping {
  name?: string;
  premium: boolean;
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
  | 'Zucchini';

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
