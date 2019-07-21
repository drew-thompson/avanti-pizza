import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { ToppingsController } from './toppings.controller';
import { ToppingsService } from './toppings.service';

describe('Toppings Controller', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ToppingsController],
      providers: [AppService, ToppingsService]
    }).compile();
  });

  let controller: ToppingsController;

  beforeEach(async () => {
    controller = app.get<ToppingsController>(ToppingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
