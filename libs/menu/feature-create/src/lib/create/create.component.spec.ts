import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { MenuUiModule } from '@avanti-pizza/menu/ui';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { ToppingsService } from '@avanti-pizza/toppings/data-access';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let menuService: MenuService;
  let toppingsService: ToppingsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule, ReactiveFormsModule, CustomMaterialModule, SharedUiModule, MenuUiModule],
      declarations: [CreateComponent],
      providers: [MenuService, ToppingsService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
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
