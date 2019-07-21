import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuController } from './menu/menu.controller';
import { MenuService } from './menu/menu.service';
import { ToppingsController } from './toppings/toppings.controller';
import { ToppingsService } from './toppings/toppings.service';

@Module({
  imports: [],
  controllers: [AppController, MenuController, ToppingsController],
  providers: [AppService, MenuService, ToppingsService]
})
export class AppModule {}
