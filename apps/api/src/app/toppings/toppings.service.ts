import { PizzaName, Topping, ToppingName } from '@avanti-pizza/api-interface';
import { RegexUtils } from '@avanti-pizza/common/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToppingsService {
  getAllToppings(): Topping[] {
    return Object.keys(toppings).map(key => toppings[key]);
  }

  getPizzaToppings(pizzaName: string): Topping[] {
    const names: ToppingName[] = recipes[pizzaName];
    return names.map(name => this.getTopping(name));
  }

  getTopping(topping: ToppingName): Topping {
    return toppings[topping];
  }

  findAllToppings(query: string): Topping[] {
    const pattern = RegexUtils.getSequenceMatcher({ query });
    return this.getAllToppings().filter(t => t.name.match(pattern));
  }
}

const toppings: Readonly<{ [T in ToppingName]: Topping }> = {
  Anchovies: { name: 'Anchovies', premium: true },
  'Artichoke Hearts': { name: 'Artichoke Hearts', premium: false },
  'Baby Arugula': { name: 'Baby Arugula', premium: false },
  Bacon: { name: 'Bacon', premium: false },
  Basil: { name: 'Basil', premium: true },
  'Bell Peppers': { name: 'Bell Peppers', premium: false },
  'Black Olives': { name: 'Black Olives', premium: false },
  Broccoli: { name: 'Broccoli', premium: false },
  Capers: { name: 'Capers', premium: false },
  'Caramelized Onion': { name: 'Caramelized Onion', premium: false },
  Carrot: { name: 'Carrot', premium: false },
  'Chicken Apple Sausage': { name: 'Chicken Apple Sausage', premium: true },
  Clams: { name: 'Clams', premium: true },
  'Feta Cheese': { name: 'Feta Cheese', premium: true },
  Garlic: { name: 'Garlic', premium: false },
  'Goat Cheese': { name: 'Goat Cheese', premium: true },
  'Gorgonzola Cheese': { name: 'Gorgonzola Cheese', premium: true },
  'Grilled Chicken': { name: 'Grilled Chicken', premium: true },
  'Ground Beef': { name: 'Ground Beef', premium: false },
  Ham: { name: 'Ham', premium: false },
  'Italian Sausage': { name: 'Italian Sausage', premium: false },
  Jalapeños: { name: 'Jalapeños', premium: false },
  'Kalamata Olives': { name: 'Kalamata Olives', premium: false },
  Meatball: { name: 'Meatball', premium: false },
  Mushrooms: { name: 'Mushrooms', premium: false },
  Onion: { name: 'Onion', premium: false },
  Oregano: { name: 'Oregano', premium: false },
  Pepperoni: { name: 'Pepperoni', premium: false },
  Pesto: { name: 'Pesto', premium: true },
  Pineapple: { name: 'Pineapple', premium: false },
  'Red Onion': { name: 'Red Onion', premium: false },
  'Ricotta Cheese': { name: 'Ricotta Cheese', premium: false },
  'Roasted Eggplant': { name: 'Roasted Eggplant', premium: false },
  'Roasted Red Peppers': { name: 'Roasted Red Peppers', premium: false },
  Salami: { name: 'Salami', premium: false },
  Spinach: { name: 'Spinach', premium: false },
  'Sun-dried Tomatoes': { name: 'Sun-dried Tomatoes', premium: false },
  Tomatoes: { name: 'Tomatoes', premium: false },
  Zucchini: { name: 'Zucchini', premium: false },
  // Included/Free Ingredients
  Cilantro: { name: 'Cilantro', premium: false, included: true },
  'Basil Pesto Sauce': { name: 'Basil Pesto Sauce', premium: false, included: true },
  'Honey Barbeque Sauce': { name: 'Honey Barbeque Sauce', premium: false, included: true },
  'House Pizza Sauce': { name: 'House Pizza Sauce', premium: false, included: true },
  'Piccante Sauce': { name: 'Piccante Sauce', premium: false, included: true },
  'Ranch Sauce': { name: 'Ranch Sauce', premium: false, included: true },
  'Savory Garlic Sauce': { name: 'Savory Garlic Sauce', premium: false, included: true }
};

const recipes: Readonly<{ [T in PizzaName]: ToppingName[] }> = {
  'BBQ Chicken': ['Grilled Chicken', 'Onion', 'Carrot', 'Cilantro', 'Honey Barbeque Sauce'],
  'Italian Blues': ['Gorgonzola Cheese', 'Spinach', 'Tomatoes'],
  "Ivan's Special": ['Grilled Chicken', 'Mushrooms', 'Tomatoes', 'Red Onion', 'Ranch Sauce'],
  "Lily's Special": ['Goat Cheese', 'Roasted Eggplant', 'Black Olives', 'Roasted Red Peppers'],
  Margherita: ['Tomatoes', 'Basil'],
  Mollusco: ['Clams', 'Garlic', 'Savory Garlic Sauce'],
  Piccante: ['Jalapeños', 'Italian Sausage', 'Black Olives', 'Tomatoes', 'Bell Peppers'],
  Belmont: ['Italian Sausage', 'Salami', 'Pepperoni', 'Mushrooms'],
  Combo: ['Caramelized Onion', 'Bell Peppers', 'Italian Sausage', 'Salami', 'Pepperoni', 'Mushrooms'],
  'Garden Veggie': ['Onion', 'Bell Peppers', 'Mushrooms', 'Tomatoes', 'Black Olives'],
  'Greek Special': ['Feta Cheese', 'Kalamata Olives', 'Tomatoes', 'Oregano', 'Capers'],
  Hawaiian: ['Ham', 'Pineapple'],
  "Lito's Special": ['Grilled Chicken', 'Artichoke Hearts', 'Feta Cheese', 'Garlic', 'Basil Pesto Sauce'],
  "Meat Lover's": ['Italian Sausage', 'Salami', 'Pepperoni', 'Ham', 'Bacon', 'Ground Beef'],
  'Tuscan Chicken': ['Grilled Chicken', 'Sun-dried Tomatoes', 'Mushrooms', 'Garlic'],
  'Veggie Italiano': ['Roasted Eggplant', 'Zucchini', 'Oregano', 'Roasted Red Peppers', 'Artichoke Hearts']
};
