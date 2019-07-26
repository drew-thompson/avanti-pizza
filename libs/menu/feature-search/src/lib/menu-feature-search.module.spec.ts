import { async, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonPipesModule } from '@avanti-pizza/common/pipes';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { MenuUiModule } from '@avanti-pizza/menu/ui';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { MenuFeatureSearchModule } from './menu-feature-search.module';

describe('MenuFeatureSearchModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MenuFeatureSearchModule,
        ReactiveFormsModule,
        MenuDataAccessModule,
        CustomMaterialModule,
        SharedUiModule,
        MenuUiModule,
        CommonPipesModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MenuFeatureSearchModule).toBeDefined();
  });
});
