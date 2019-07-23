import { async, TestBed } from '@angular/core/testing';
import { CommonPipesModule } from '@avanti-pizza/common/pipes';
import { SharedUiModule } from './shared-ui.module';

describe('SharedUiModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonPipesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiModule).toBeDefined();
  });
});
