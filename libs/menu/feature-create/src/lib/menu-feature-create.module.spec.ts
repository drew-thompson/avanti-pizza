import { async, TestBed } from '@angular/core/testing';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { MenuFeatureCreateModule } from './menu-feature-create.module';

describe('MenuFeatureCreateModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MenuFeatureCreateModule, SharedUiModule, MenuDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MenuFeatureCreateModule).toBeDefined();
  });
});
