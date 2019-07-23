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

  getTooltipText(): string {
    if (this.pizza.thin) {
      return 'Thin Crust Pizza';
    }
    return 'Regular Crust Pizza';
  }
}
