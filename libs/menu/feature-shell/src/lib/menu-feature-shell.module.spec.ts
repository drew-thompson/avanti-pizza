import { async, TestBed } from '@angular/core/testing';
import { MenuFeatureShellModule } from './menu-feature-shell.module';

describe('MenuFeatureShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MenuFeatureShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MenuFeatureShellModule).toBeDefined();
  });
});
