import { BasePricingChart, Pizza, PizzaSize, PricingChart, Topping } from '@avanti-pizza/api-interface';
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
    const basicToppingCount = toppings.length - premiumToppingCount;

    return +(baseCost + basicToppingCount * toppingCost + premiumToppingCount * premiumToppingCost).toFixed(2);
  }

  calculatePricingChart(pizza: Pizza): PricingChart {
    return {
      slice: this.calculatePrice('slice', pizza.toppings),
      '12': this.calculatePrice('12', pizza.toppings),
      '14': this.calculatePrice('14', pizza.toppings),
      '16': this.calculatePrice('16', pizza.toppings),
      '18': this.calculatePrice('18', pizza.toppings)
    };
  }

  getPizzas(): Pizza[] {
    return pizzas.map(p => {
      return { ...p, toppings: this.toppingsService.getPizzaToppings(p.name) };
    });
  }
}

export const pizzas: Pizza[] = [
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
  }
];

export const basePizzaPricing: BasePricingChart = {
  slice: { cost: 3.75, toppingCost: 0.4 },
  '12': { cost: 14.1, toppingCost: 1.5 },
  '14': { cost: 17.5, toppingCost: 2 },
  '16': { cost: 21.2, toppingCost: 2.5 },
  '18': { cost: 26.1, toppingCost: 3 }
};
