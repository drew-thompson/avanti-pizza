import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';
import { Topping } from '@avanti-pizza/api-interface';
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
  @ViewChild('input', { static: false }) input: ElementRef<HTMLInputElement>;

  readonly toppings$ = this.toppingsService.getAll();

  recipeControl: FormControl = new FormControl('');
  filteredToppings$: Observable<Topping[]>;

  selectedToppings$: BehaviorSubject<Topping[]> = new BehaviorSubject<Topping[]>([]);

  constructor(private menuService: MenuService, private toppingsService: ToppingsService) {}

  ngOnInit() {
    (this.recipeControl.valueChanges as Observable<string>)
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.filteredToppings$ = this.toppingsService.findAll(query).pipe(
          withLatestFrom(this.selectedToppings$),
          map(arr => {
            const options = arr[0];
            const selectedNames = arr[1].map(t => t.name);
            return options.filter(option => !selectedNames.includes(option.name));
          })
        );
      });
  }

  reset(): void {
    this.recipeControl.patchValue('');
    this.input.nativeElement.value = '';
    this.refreshResults();
  }

  refreshResults(value: string = this.recipeControl.value): void {
    this.filteredToppings$ = this.toppingsService.findAll(value);
  }

  select(event: MatOptionSelectionChange, topping: Topping): void {
    if (event.isUserInput) {
      const snapshot = this.selectedToppings$.value;
      if (this.isSelected(topping.name)) {
        this.remove(topping);
      } else {
        this.selectedToppings$.next([...snapshot, topping]);
        this.reset();
      }
    }
  }

  isSelected(name: string): boolean {
    return this.selectedToppings$.value.map(t => t.name).includes(name);
  }

  remove(topping: Topping): void {
    const snapshot = this.selectedToppings$.value;
    const index = snapshot.map(t => t.name).indexOf(topping.name);
    this.selectedToppings$.next([...snapshot.slice(0, index), ...snapshot.slice(index + 1)]);
    this.refreshResults();
  }
}
