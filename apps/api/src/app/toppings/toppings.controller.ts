import { Topping, ToppingName } from '@avanti-pizza/api-interface';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ToppingsService } from './toppings.service';

@Controller('toppings')
export class ToppingsController {
  constructor(private toppingsService: ToppingsService) {}

  @Get()
  getToppings(): Topping[] {
    return this.toppingsService.getAllToppings();
  }

  @Get('autocomplete')
  findAll(@Query('q') query: string): Topping[] {
    return this.toppingsService.findAllToppings(query);
  }

  @Get(':name')
  findOne(@Param('name') name: ToppingName): Topping {
    return this.toppingsService.getTopping(name);
  }
}
