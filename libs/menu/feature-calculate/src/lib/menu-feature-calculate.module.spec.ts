import { async, TestBed } from '@angular/core/testing';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { MenuFeatureCalculateModule } from './menu-feature-calculate.module';

describe('MenuFeatureCalculateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MenuFeatureCalculateModule, SharedUiModule, MenuDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MenuFeatureCalculateModule).toBeDefined();
  });
});
