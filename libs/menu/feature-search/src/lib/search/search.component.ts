import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger, MatOptionSelectionChange } from '@angular/material';
import { Drink, DrinkAutocompleteType, Pizza } from '@avanti-pizza/api-interface';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { MenuAutocompleteComponent } from '@avanti-pizza/menu/ui';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'avanti-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @ViewChild('drinksAutoTrigger', { static: true }) drinksAutoTrigger: MatAutocompleteTrigger;
  @ViewChild('pizzaAutocomplete', { static: true }) pizzaAutocomplete: MenuAutocompleteComponent;
  @ViewChild('drinkAutocomplete', { static: true }) drinkAutocomplete: MenuAutocompleteComponent;

  menu$ = this.menuService.getMenu();

  /** Pizza search form control. */
  searchControl = new FormControl('');
  /** The currently selected pizza. */
  selectedPizza$: Subject<Pizza> = new Subject<Pizza>();
  /** Drink search form control. */
  drinkSearchControl = new FormControl('');
  /** All drinks that result from the drink query. */
  filteredDrinks$: Subject<Drink[]> = new Subject<Drink[]>();
  /** The currently selected drink. */
  selectedDrink$: Subject<Drink> = new Subject<Drink>();

  readonly drinkType: DrinkAutocompleteType = 'drinks';
  drinkTypeControl = new FormControl(this.drinkType);

  selectedDrinkFilter$: Observable<DrinkAutocompleteType>;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.selectedDrinkFilter$ = this.debounce(this.drinkTypeControl.valueChanges.pipe(startWith(this.drinkType)) as Observable<
      DrinkAutocompleteType
    >);

    this.debounce(this.drinkTypeControl.valueChanges).subscribe(type => {
      this.resetDrinkSearch();
    });
  }

  onPizzaSelected(pizza: Pizza): void {
    this.selectedPizza$.next(pizza);
  }

  onDrinkSelected(drink: Drink): void {
    this.selectedDrink$.next(drink);
  }

  resetPizzaSearch(): void {
    this.searchControl.patchValue('');
    this.selectedPizza$.next();
    this.pizzaAutocomplete.clearInput();
  }

  resetDrinkSearch(): void {
    this.drinkSearchControl.patchValue('');
    this.selectedDrink$.next();
    this.drinkAutocomplete.clearInput();
  }

  setDrinkFilterType(type: DrinkAutocompleteType): void {
    this.drinkTypeControl.patchValue(type);
  }

  private debounce<T>(stream: Observable<T>): Observable<T> {
    return stream.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
  }
}
