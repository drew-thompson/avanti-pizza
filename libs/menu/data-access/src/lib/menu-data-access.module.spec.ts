import { async, TestBed } from '@angular/core/testing';
import { MenuDataAccessModule } from './menu-data-access.module';
import { MenuService } from './menu.service';

describe('MenuDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MenuDataAccessModule],
      providers: [MenuService]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MenuDataAccessModule).toBeDefined();
  });
});
