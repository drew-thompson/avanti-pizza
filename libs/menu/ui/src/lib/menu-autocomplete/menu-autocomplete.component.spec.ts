import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { ToppingsDataAccessModule } from '@avanti-pizza/toppings/data-access';
import { MenuAutocompleteComponent } from './menu-autocomplete.component';

describe('MenuAutocompleteComponent', () => {
  let component: MenuAutocompleteComponent;
  let fixture: ComponentFixture<MenuAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MenuDataAccessModule,
        ToppingsDataAccessModule,
        CustomMaterialModule,
        SharedUiModule,
        BrowserAnimationsModule
      ],
      declarations: [MenuAutocompleteComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAutocompleteComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    component.type = 'toppings';
    component.suffixIcon = 'clear';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
