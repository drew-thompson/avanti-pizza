import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { MenuUiModule } from '@avanti-pizza/menu/ui';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { ToppingsDataAccessModule } from '@avanti-pizza/toppings/data-access';
import { MenuFeatureCreateModule } from './menu-feature-create.module';

describe('MenuFeatureCreateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MenuFeatureCreateModule,
        ReactiveFormsModule,
        MenuDataAccessModule,
        ToppingsDataAccessModule,
        CustomMaterialModule,
        MenuUiModule,
        SharedUiModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MenuFeatureCreateModule).toBeDefined();
  });
});
