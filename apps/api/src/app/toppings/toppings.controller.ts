import { Topping, ToppingName } from '@avanti-pizza/api-interface';
import { Controller, Get, Query } from '@nestjs/common';
import { ToppingsService } from './toppings.service';

@Controller('toppings')
export class ToppingsController {
  constructor(private toppingsService: ToppingsService) {}

  @Get()
  findOne(@Query('name') name: ToppingName): Topping {
    return this.toppingsService.getTopping(name);
  }
}
