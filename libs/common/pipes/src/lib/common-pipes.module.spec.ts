import { async, TestBed } from '@angular/core/testing';
import { CommonPipesModule } from './common-pipes.module';

describe('CommonPipesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonPipesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonPipesModule).toBeDefined();
  });
});
