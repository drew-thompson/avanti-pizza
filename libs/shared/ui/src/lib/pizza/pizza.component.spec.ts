import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pizza } from '@avanti-pizza/api-interface';
import { PizzaComponent } from './pizza.component';

describe('PizzaComponent', () => {
  let component: PizzaComponent;
  const completePizza: Pizza = {
    name: 'Garden Veggie',
    description: 'The veggiest pizza!',
    pricing: {
      slice: 1,
      '12': 2,
      '14': 3.5,
      '16': 5,
      '18': 7.5
    },
    toppings: [{ name: 'Bell Peppers', premium: false }],
    thin: false
  };
  let fixture: ComponentFixture<PizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaComponent);
    component = fixture.componentInstance;
    component.pizza = completePizza;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
