import { PizzaMenu } from '@avanti-pizza/api-interface';
import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  getMenu(): PizzaMenu {
    return this.menuService.getPizzas().reduce((map, pizza) => {
      map[pizza.name] = { ...pizza, pricing: this.menuService.calculatePricingChart(pizza) };
      return map;
    }, {});
  }
}
