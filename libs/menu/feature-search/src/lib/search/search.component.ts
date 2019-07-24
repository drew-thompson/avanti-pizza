import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger, MatOptionSelectionChange } from '@angular/material';
import { Drink, DrinkAutocompleteType, Pizza } from '@avanti-pizza/api-interface';
import { RegexUtils } from '@avanti-pizza/common/utils';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { Observable, Subject, timer } from 'rxjs';
import { debounceTime, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'avanti-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @ViewChild('drinksAutoTrigger', { static: true }) drinksAutoTrigger: MatAutocompleteTrigger;

  menu$ = this.menuService.getMenu();
  pizzas$ = this.menuService.getPizzas();

  /** Pizza search form control. */
  searchControl = new FormControl('');
  /** Pizzas that match the current search criteria. */
  filteredPizzas$: Subject<Pizza[]> = new Subject<Pizza[]>();
  /** The currently selected pizza. */
  selectedPizza$: Subject<Pizza> = new Subject<Pizza>();
  /** Drink search form control. */
  drinkSearchControl = new FormControl('');
  /** All drinks that result from the drink query. */
  filteredDrinks$: Subject<Drink[]> = new Subject<Drink[]>();
  /** The currently selected drink. */
  selectedDrink$: Subject<Drink> = new Subject<Drink>();

  readonly filterStyle: 'exact' | 'loose' | 'sequence' = 'sequence';
  readonly drinkType: DrinkAutocompleteType | 'all' = 'all';
  filterStyleControl = new FormControl(this.filterStyle);
  drinkTypeControl = new FormControl(this.drinkType);

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.debounce(this.searchControl.valueChanges as Observable<string>)
      .pipe(withLatestFrom(this.pizzas$))
      .subscribe(arr => {
        const query = arr[0];
        const pizzas = arr[1];

        const filtered = this.getFilteredPizzas({ query, pizzas });
        this.filteredPizzas$.next(filtered);
      });

    this.debounce(this.drinkSearchControl.valueChanges as Observable<string>).subscribe(query => this.updateFilteredDrinks({ query }));

    this.debounce(this.drinkTypeControl.valueChanges).subscribe(type => {
      this.updateFilteredDrinks({ type });
      this.resetDrinkSearch();
    });
  }

  select(event: MatOptionSelectionChange, object: Pizza | Drink): void {
    if (event.isUserInput) {
      if ('toppings' in object) {
        this.selectedPizza$.next(object);
      } else {
        this.selectedDrink$.next(object as Drink);
      }
    }
  }

  resetPizzaSearch(): void {
    this.searchControl.patchValue('');
    this.selectedPizza$.next();
  }

  resetDrinkSearch(): void {
    this.drinkSearchControl.patchValue('');
    this.selectedDrink$.next();
  }

  setDrinkFilterType(type: DrinkAutocompleteType | 'all'): void {
    this.drinkTypeControl.patchValue(type);
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

  private updateFilteredDrinks({
    query = this.drinkSearchControl.value,
    type = this.drinkTypeControl.value
  }: {
    query?: string;
    type?: DrinkAutocompleteType;
  }): void {
    this.menuService.findAllDrinks({ query, type }).subscribe(drinks => this.filteredDrinks$.next(drinks));
  }

  private debounce<T>(stream: Observable<T>): Observable<T> {
    return stream.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
  }
}
