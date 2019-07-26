import {
  Beer,
  Beverage,
  Drink,
  DrinkAutocompleteType,
  Food,
  FoodAutocompleteType,
  Pizza,
  PizzaMenu,
  PizzaSize,
  PricingChart,
  Topping,
  ToppingName
} from '@avanti-pizza/api-interface';
import { Controller, Get, Query } from '@nestjs/common';
import { ToppingsService } from '../toppings/toppings.service';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService, private toppingsService: ToppingsService) {}

  @Get()
  getMenu(): PizzaMenu {
    return this.menuService.getPizzas().reduce((map, pizza) => {
      map[pizza.name] = pizza;
      return map;
    }, {});
  }

  @Get('food/autocomplete')
  findAllFood(@Query('q') query: string, @Query('type') type?: FoodAutocompleteType): Food[] {
    return this.menuService.findAllFood({ query, type });
  }

  @Get('food/pizzas')
  getPizzas(): Pizza[] {
    return this.menuService.getPizzas();
  }

  /**
   * Calculates one or more prices for a given pizza of size and toppings.
   * @param complete Whether the complete pricing chart should be calculated
   * @param size Size of the pizza
   * @param toppings Toppings served hot!
   */
  @Get('food/pizzas/calculate')
  calculatePrice(
    @Query('complete') complete: boolean,
    @Query('size') size: PizzaSize,
    @Query('toppings') toppings: string
  ): number | PricingChart {
    if (!complete && this.sizeInvalid(size)) {
      return undefined;
    }

    let names: ToppingName[];
    let foundToppings: Topping[] = [];
    if (toppings) {
      names = toppings.split(',') as ToppingName[];
      foundToppings = names.map(n => this.toppingsService.getTopping(n)).filter(t => t);
    }
    if (!complete) {
      return this.menuService.calculatePrice(size, foundToppings);
    } else {
      return this.menuService.calculatePricingChart(foundToppings);
    }
  }

  @Get('drinks')
  getDrinks(): Readonly<Drink[]> {
    return this.menuService.getDrinks();
  }

  @Get('drinks/autocomplete')
  findAllDrinks(@Query('q') query: string, @Query('type') type?: DrinkAutocompleteType): Drink[] {
    return this.menuService.findAllDrinks({ query, type });
  }

  @Get('drinks/beers')
  getBeers(): Readonly<Beer[]> {
    return this.menuService.getBeers();
  }

  @Get('drinks/beverages')
  getBeverages(): Readonly<Beverage[]> {
    return this.menuService.getBeverages();
  }

  private sizeInvalid(size: PizzaSize): boolean {
    return size !== 'slice' && size !== '12' && size !== '14' && size !== '16' && size !== '18';
  }
}
