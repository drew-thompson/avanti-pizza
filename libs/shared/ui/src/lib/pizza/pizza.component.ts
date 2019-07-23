import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Pizza } from '@avanti-pizza/api-interface';

@Component({
  selector: 'avanti-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaComponent {
  /** Pizza to display. */
  @Input() pizza: Pizza;

  /**
   * Returns the text representation of this pizza's crust type.
   */
  getCrustDescription(): string {
    if (this.pizza.thin) {
      return 'Thin Crust';
    }
    return 'Regular Crust';
  }

  /**
   * Whether this pizza has at least one premium topping.
   */
  hasPremiumTopping(): boolean {
    return this.pizza.toppings.some(t => t.premium);
  }
}
