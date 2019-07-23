import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { ToppingsService } from '@avanti-pizza/toppings/data-access';
import { CalculateComponent } from './calculate.component';

describe('CalculateComponent', () => {
  let component: CalculateComponent;
  let fixture: ComponentFixture<CalculateComponent>;
  let menuService: MenuService;
  let toppingsService: ToppingsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, ReactiveFormsModule, CustomMaterialModule, SharedUiModule],
      declarations: [CalculateComponent],
      providers: [MenuService, ToppingsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateComponent);
    menuService = TestBed.get(MenuService);
    toppingsService = TestBed.get(ToppingsService);
    component = fixture.componentInstance;
    component.filteredToppings$ = toppingsService.findAll('ab');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
