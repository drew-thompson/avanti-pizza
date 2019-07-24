import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Drink, Beer } from '@avanti-pizza/api-interface';

@Component({
  selector: 'avanti-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrinkComponent {
  /** Drink to display. */
  @Input() drink: Drink;

  isBeer(): boolean {
    return 'type' in this.drink;
  }

  getBeer(): Beer {
    return this.drink as Beer;
  }
}
