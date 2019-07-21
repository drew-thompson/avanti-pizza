import { Test, TestingModule } from '@nestjs/testing';
import { ToppingsService } from '../toppings/toppings.service';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

describe('Menu Controller', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [MenuController],
      providers: [MenuService, ToppingsService]
    }).compile();
  });

  let controller: MenuController;

  beforeEach(async () => {
    controller = app.get<MenuController>(MenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
