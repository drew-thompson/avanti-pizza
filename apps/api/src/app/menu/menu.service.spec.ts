import { Test, TestingModule } from '@nestjs/testing';
import { ToppingsService } from '../toppings/toppings.service';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let toppingsService: ToppingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService, ToppingsService]
    }).compile();

    service = module.get<MenuService>(MenuService);
    toppingsService = module.get<ToppingsService>(ToppingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(toppingsService).toBeDefined();
  });
});
