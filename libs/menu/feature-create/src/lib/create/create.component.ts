import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pizza, PizzaName, PricingChart, Topping } from '@avanti-pizza/api-interface';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { MenuAutocompleteComponent } from '@avanti-pizza/menu/ui';
import { ToppingsService } from '@avanti-pizza/toppings/data-access';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'avanti-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {
  /** All available toppings. */
  readonly toppings$ = this.toppingsService.getAll();
  /** Input reference needed to clear chip-input. */
  @ViewChild(MenuAutocompleteComponent, { static: false }) menuAutocomplete: MenuAutocompleteComponent;

  /** Control for the current topping being searched.*/
  recipeControl: FormControl = new FormControl('');
  /** All toppings that have been found based on the current query, minus any already selected toppings (if cannot add duplicates). */
  filteredToppings$: Observable<Topping[]>;
  /** Pricing chart for pizza with currently selected ingredients. */
  pricingChart$: Observable<PricingChart>;
  /** All toppings that have been added to the pizza. */
  selectedToppings$: BehaviorSubject<Topping[]> = new BehaviorSubject<Topping[]>([]);

  constructor(private menuService: MenuService, private toppingsService: ToppingsService) {}

  ngOnInit() {
    this.filteredToppings$ = this.recipeControl.valueChanges.pipe(
      debounceTime(125),
      distinctUntilChanged(),
      switchMap(query => this.toppingsService.findAll(query))
    );

    this.selectedToppings$.pipe(map(toppings => toppings.map(t => t.name))).subscribe(toppings => {
      this.pricingChart$ = this.menuService.calculatePricingChart({ toppings });
    });
  }

  /**
   * Reset recipe control and filtered results.
   */
  reset(): void {
    this.recipeControl.patchValue('');
    this.menuAutocomplete.chipInput.nativeElement.value = '';
  }

  /**
   * Reset current selection, as well as input and results.
   */
  clear(): void {
    this.selectedToppings$.next([]);
    this.reset();
  }

  /**
   * Select a topping to add from the autocomplete dropdown.
   */
  onToppingSelected(topping: Topping): void {
    const snapshot = this.selectedToppings$.value;
    this.selectedToppings$.next([...snapshot, topping]);
    this.reset();
  }

  /**
   * Remove a specified topping from the list of selected toppings.
   */
  onToppingRemoved(index: number): void {
    const snapshot = this.selectedToppings$.value;
    this.selectedToppings$.next([...snapshot.slice(0, index), ...snapshot.slice(index + 1)]);
  }

  /**
   * Get the representation of the current pizza.
   * @param pricing Pricing chart calculated from added toppings
   */
  getPizza(pricing: PricingChart): Pizza {
    const toppings = this.selectedToppings$.value;
    return {
      name: '' as PizzaName,
      description: this.getDescription(toppings),
      pricing,
      toppings,
      thin: true
    };
  }

  private getDescription(toppings: Topping[]): string {
    const names = toppings.map(t => t.name);
    if (!toppings.length) {
      return 'A new pizza!';
    } else if (toppings.length === 1) {
      return `A new pizza with ${names[0]}.`;
    } else {
      return `A pizza with ${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}.`;
    }
  }
}
