import { async, TestBed } from '@angular/core/testing';
import { ToppingsDataAccessModule } from './toppings-data-access.module';
import { ToppingsService } from './toppings.service';

describe('ToppingsDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ToppingsDataAccessModule],
      providers: [ToppingsService]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ToppingsDataAccessModule).toBeDefined();
  });
});
