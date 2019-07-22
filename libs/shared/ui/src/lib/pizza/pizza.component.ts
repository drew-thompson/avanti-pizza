import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Pizza } from '@avanti-pizza/api-interface';

@Component({
  selector: 'avanti-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PizzaComponent implements OnInit {
  /** Pizza to display. */
  @Input() pizza: Pizza;

  constructor() {}

  ngOnInit() {}
}
