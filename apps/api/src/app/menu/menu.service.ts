import {
  BasePricingChart,
  Beer,
  BeerTypePricing,
  Beverage,
  Drink,
  DrinkAutocompleteType,
  Food,
  Pizza,
  PizzaSize,
  PricingChart,
  Topping,
  FoodAutocompleteType
} from '@avanti-pizza/api-interface';
import { RegexUtils } from '@avanti-pizza/common/utils';
import { Injectable } from '@nestjs/common';
import { ToppingsService } from '../toppings/toppings.service';

@Injectable()
export class MenuService {
  constructor(private toppingsService: ToppingsService) {}

  calculatePrice(size: PizzaSize, toppings: Topping[] = []): number {
    const pricing = basePizzaPricing[size];
    const baseCost = pricing.cost;
    const toppingCost = pricing.toppingCost;
    const premiumToppingCost = toppingCost * 2;

    const premiumToppingCount = toppings.filter(topping => topping.premium).length;
    const basicToppingCount = toppings.filter(t => !t.included).length - premiumToppingCount;

    return +(baseCost + basicToppingCount * toppingCost + premiumToppingCount * premiumToppingCost).toFixed(2);
  }

  calculatePricingChart(toppings: Topping[]): PricingChart {
    return {
      slice: this.calculatePrice('slice', toppings),
      '12': this.calculatePrice('12', toppings),
      '14': this.calculatePrice('14', toppings),
      '16': this.calculatePrice('16', toppings),
      '18': this.calculatePrice('18', toppings)
    };
  }

  getPizzas(): Pizza[] {
    return pizzas.map(p => {
      const topped = { ...p, toppings: this.toppingsService.getPizzaToppings(p.name) };
      return { ...topped, pricing: this.calculatePricingChart(topped.toppings) };
    });
  }

  getDrinks(): Readonly<Drink[]> {
    return [...this.getBeers(), ...this.getBeverages()];
  }

  getBeers(): Readonly<Beer[]> {
    return beers.map(b => this.getBeerWithPricing(b));
  }

  getBeverages(): Readonly<Beverage[]> {
    return beverages;
  }

  getBeerCost(beer: Beer): number {
    return beerTypePricing[beer.type];
  }

  getBeerWithPricing(beer: Pick<Beer, 'name' | 'type'>): Beer {
    return { ...beer, cost: beerTypePricing[beer.type] };
  }

  findAllDrinks({ query, type }: { query: string; type: DrinkAutocompleteType }): Drink[] {
    const pattern = RegexUtils.getSequenceMatcher({ query });

    if (type === 'beers') {
      return this.getBeers().filter(d => d.name.match(pattern));
    } else if (type === 'beverages') {
      return this.getBeverages().filter(d => d.name.match(pattern));
    } else {
      return this.getDrinks().filter(d => d.name.match(pattern));
    }
  }

  findAllFood({ query, type }: { query: string; type: FoodAutocompleteType }): Food[] {
    const pattern = RegexUtils.getSequenceMatcher({ query });

    if (type === 'pizzas') {
      return this.getPizzas().filter(p => p.name.match(pattern));
    } else if (type === 'toppings') {
      // TODO: Migrate toppings into menu domain
      return this.toppingsService.findAllToppings(query);
    } else {
      return [...this.getPizzas(), ...this.toppingsService.getAllToppings()].filter(food => food.name.match(pattern));
    }
  }
}

export const pizzas: Readonly<Pizza[]> = [
  {
    name: 'BBQ Chicken',
    description: 'Chicken, fresh onion, carrot, and cilantro with honey barbecue sauce base',
    thin: true
  },
  {
    name: 'Italian Blues',
    description: 'Gorgonzola cheese, spinach and tomatoes with our house pizza sauce',
    thin: true
  },
  {
    name: "Ivan's Special",
    description: 'Chicken, mushrooms, tomatoes, and red onions with ranch dressing base',
    thin: true
  },
  {
    name: "Lily's Special",
    description: 'Goat cheese, roasted eggplant, olives and roasted red peppers with our house pizza sauce',
    thin: true
  },
  {
    name: 'Margherita',
    description: 'Tomatoes and basil with our house pizza sauce',
    thin: true
  },
  {
    name: 'Mollusco',
    description: 'Clams and garlic with our savory garlic sauce base',
    thin: true
  },
  {
    name: 'Piccante',
    description: 'Jalapeños, sausage, olives, picante sauce, tomatoes, and bell peppers with our house pizza sauce',
    thin: true
  },
  {
    name: 'Belmont',
    description: 'Italian sausage, salami, pepperoni, and mushrooms with our house pizza sauce',
    thin: false
  },
  {
    name: 'Combo',
    description: 'Caramelized onions, bell peppers, sausage, salami, pepperoni, and mushrooms with our house pizza sauce',
    thin: false
  },
  {
    name: 'Garden Veggie',
    description: 'Fresh onions, bell peppers, mushrooms, tomatoes, and olives with our house pizza sauce',
    thin: false
  },
  {
    name: 'Greek Special',
    description: 'Feta cheese, kalamata olives, tomatoes, oregano, and capers with our house pizza sauce',
    thin: false
  },
  {
    name: 'Hawaiian',
    description: 'Ham and pineapple with our house pizza sauce',
    thin: false
  },
  {
    name: "Lito's Special",
    description: 'Chicken, artichoke hearts, feta cheese, and garlic with basil pesto sauce base',
    thin: false
  },
  {
    name: "Meat Lover's",
    description: 'Italian sausage, salami, pepperoni, ham, bacon, and ground beef with our house pizza sauce',
    thin: false
  },
  {
    name: 'Tuscan Chicken',
    description: 'Chicken, sun-dried tomatoes, mushrooms, and garlic with our house pizza sauce',
    thin: false
  },
  {
    name: 'Veggie Italiano',
    description: 'Eggplant, zucchini, oregano, roasted red peppers, and artichoke hearts with our house pizza sauce',
    thin: false
  }
];

export const beerTypePricing: BeerTypePricing = {
  Domestic: 3,
  IPA: 4,
  Imported: 4
};

export const beers: Readonly<Beer[]> = [
  { name: 'Bud Light', type: 'Domestic' },
  { name: 'Budweiser', type: 'Domestic' },
  { name: 'Coors Light', type: 'Domestic' },
  { name: 'Corona', type: 'Imported' },
  { name: 'Dos Equis', type: 'Imported' },
  { name: 'Heineken', type: 'Imported' },
  { name: 'Lagunitas IPA', type: 'IPA' },
  { name: 'Negra Modelo', type: 'Imported' },
  { name: 'Pacifico', type: 'Imported' },
  { name: 'Sierra Nevada Pale Ale', type: 'IPA' },
  { name: 'Victoria', type: 'Imported' }
];

export const beverages: Readonly<Beverage[]> = [
  { name: 'Water', cost: 1.35 },
  { name: 'Coke', cost: 1.35 },
  { name: 'Diet Coke', cost: 1.35 },
  { name: 'Pepsi', cost: 1.35 },
  { name: 'Diet Pepsi', cost: 1.35 },
  { name: 'A&W Rootbeer', cost: 1.35 },
  { name: 'Diet A&W Rootbeer', cost: 1.35 },
  { name: 'Mug Rootbeer', cost: 1.35 },
  { name: '7up', cost: 1.35 },
  { name: 'Diet 7up', cost: 1.35 },
  { name: 'Crush', cost: 1.35 },
  { name: 'Nestea', cost: 1.35 },
  { name: 'Kerns', cost: 1.8 },
  { name: 'Orange Juice', cost: 2 },
  { name: 'Mango Juice', cost: 2 },
  { name: 'Cranberry Juice', cost: 2 },
  { name: 'Snapple', cost: 2.75 },
  { name: 'Gatorage', cost: 2.75 },
  { name: 'Mexican Coke', cost: 2.75 },
  { name: 'Two Liter Soda', cost: 3 }
];

export const drinks: Readonly<Drink[]> = [...beverages, ...beers];

export const basePizzaPricing: Readonly<BasePricingChart> = {
  slice: { cost: 3.75, toppingCost: 0.4 },
  '12': { cost: 14.1, toppingCost: 1.5 },
  '14': { cost: 17.5, toppingCost: 2 },
  '16': { cost: 21.2, toppingCost: 2.5 },
  '18': { cost: 26.1, toppingCost: 3 }
};
