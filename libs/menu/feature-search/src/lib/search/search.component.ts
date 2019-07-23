import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';
import { Pizza } from '@avanti-pizza/api-interface';
import { RegexUtils } from '@avanti-pizza/common/utils';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'avanti-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  menu$ = this.menuService.getMenu();
  pizzas$ = this.menuService.getPizzas();

  /** Pizza search form control. */
  searchControl = new FormControl('');
  /** The currently selected pizza. */

  filteredPizzas$: Subject<Pizza[]> = new Subject<Pizza[]>();
  selectedPizza$: Subject<Pizza> = new Subject<Pizza>();
  /** Characters that */
  filteredCharacterMatches: Subject<number[]> = new Subject<number[]>();

  readonly filterStyle: 'exact' | 'loose' | 'sequence' = 'sequence';
  filterStyleControl = new FormControl(this.filterStyle);

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

        const filtered = this.getFilteredPizzas({ query, pizzas });
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

  private getFilteredPizzas({ query, pizzas }: { query: string; pizzas: Pizza[] }): Pizza[] {
    switch (this.filterStyleControl.value) {
      case 'exact':
        return pizzas.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
      case 'loose':
        const looseExpression = query
          .split('')
          .map(c => `(?=.*${c})`)
          .join('');
        const looseRegex = new RegExp(`^${looseExpression}.+$`, 'i');
        return pizzas.filter(p => p.name.match(looseRegex));
      case 'sequence':
      default:
        return pizzas.filter(p => p.name.match(RegexUtils.getSequenceMatcher({ query })));
    }
  }
}
