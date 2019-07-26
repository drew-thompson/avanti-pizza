import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { ToppingsDataAccessModule } from '@avanti-pizza/toppings/data-access';
import { MenuUiModule } from './menu-ui.module';

describe('MenuUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MenuUiModule, ReactiveFormsModule, MenuDataAccessModule, ToppingsDataAccessModule, CustomMaterialModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MenuUiModule).toBeDefined();
  });
});
