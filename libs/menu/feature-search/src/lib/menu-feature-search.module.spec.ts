import { async, TestBed } from '@angular/core/testing';
import { MenuFeatureSearchModule } from './menu-feature-search.module';

describe('MenuFeatureSearchModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MenuFeatureSearchModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MenuFeatureSearchModule).toBeDefined();
  });
});
