import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';
import { Pizza, PizzaName, PricingChart, Topping } from '@avanti-pizza/api-interface';
import { MenuService } from '@avanti-pizza/menu/data-access';
import { ToppingsService } from '@avanti-pizza/toppings/data-access';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'avanti-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {
  /** All available toppings. */
  readonly toppings$ = this.toppingsService.getAll();
  /** Input reference needed to clear chip-input. */
  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;

  /** Control for the current topping being searched.*/
  recipeControl: FormControl = new FormControl('');
  /** All toppings that have been found based on the current query, minus any already selected toppings (if cannot add duplicates). */
  filteredToppings$: Observable<Topping[]>;
  /** Pricing chart for pizza with currently selected ingredients. */
  pricingChart$: Observable<PricingChart>;
  /** All toppings that have been added to the pizza. */
  selectedToppings$: BehaviorSubject<Topping[]> = new BehaviorSubject<Topping[]>([]);

  private canAddDuplicates = true;

  constructor(private menuService: MenuService, private toppingsService: ToppingsService) {}

  ngOnInit() {
    (this.recipeControl.valueChanges as Observable<string>)
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(query => {
        if (this.canAddDuplicates) {
          this.filteredToppings$ = this.toppingsService.findAll(query);
        } else {
          this.filteredToppings$ = this.toppingsService.findAll(query).pipe(
            withLatestFrom(this.selectedToppings$),
            map(arr => {
              const options = arr[0];
              const selectedNames = arr[1].map(t => t.name);
              return options.filter(option => !selectedNames.includes(option.name));
            })
          );
        }
      });

    this.selectedToppings$.pipe(map(toppings => toppings.map(t => t.name))).subscribe(toppings => {
      this.pricingChart$ = this.menuService.calculatePricingChart({ toppings });
    });
  }

  /**
   * Reset recipe control and filtered results.
   */
  reset(): void {
    this.recipeControl.patchValue('');
    this.input.nativeElement.value = '';
    this.refreshResults();
  }

  /**
   * Reset current selection, as well as input and results.
   */
  clear(): void {
    this.selectedToppings$.next([]);
    this.reset();
  }

  /**
   * Synchronize results with the most recent filter query.
   */
  refreshResults(value: string = this.recipeControl.value): void {
    this.filteredToppings$ = this.toppingsService.findAll(value);
  }

  /**
   * Select a topping to add from the autocomplete dropdown.
   */
  select(event: MatOptionSelectionChange, topping: Topping): void {
    if (event.isUserInput) {
      const snapshot = this.selectedToppings$.value;
      this.selectedToppings$.next([...snapshot, topping]);
      this.reset();
    }
  }

  /**
   * Remove a specified topping from the list of selected toppings.
   * @param topping Topping to remove from selected list of toppings
   */
  remove(topping: Topping): void {
    const snapshot = this.selectedToppings$.value;
    const index = snapshot.map(t => t.name).indexOf(topping.name);
    this.selectedToppings$.next([...snapshot.slice(0, index), ...snapshot.slice(index + 1)]);
    this.refreshResults('');
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
