import { async, TestBed } from '@angular/core/testing';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuFeatureSelectModule } from './menu-feature-select.module';

describe('MenuFeatureSelectModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MenuFeatureSelectModule, CustomMaterialModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MenuFeatureSelectModule).toBeDefined();
  });
});
