import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';
import { Pizza } from '@avanti-pizza/api-interface';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'avanti-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  menu$ = this.menuService.getMenu();
  pizzas$ = this.menuService.getPizzas();

  /** Pizza search form control. */
  searchControl = new FormControl('');
  /** The currently selected pizza. */

  filteredPizzas$: Subject<Pizza[]> = new Subject<Pizza[]>();
  selectedPizza$: Subject<Pizza> = new Subject<Pizza>();

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    (this.searchControl.valueChanges as Observable<string>)
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        withLatestFrom(this.pizzas$)
      )
      .subscribe(arr => {
        const query = arr[0];
        const pizzas = arr[1];
        const filtered = pizzas.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
        this.filteredPizzas$.next(filtered);
      });
  }

  select(event: MatOptionSelectionChange, pizza: Pizza): void {
    if (event.isUserInput) {
      this.selectedPizza$.next(pizza);
    }
  }

  reset(): void {
    this.searchControl.patchValue('');
    this.selectedPizza$.next();
  }
}
