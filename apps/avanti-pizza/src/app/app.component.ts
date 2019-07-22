import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Pizza } from '@avanti-pizza/api-interface';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material';

@Component({
  selector: 'avanti-pizza-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  menu$ = this.http.get('/api/menu');
  pizzas$ = this.http.get<Pizza[]>('/api/menu/pizzas');

  /** Pizza search form control. */
  searchControl = new FormControl('');
  /** The currently selected pizza. */

  filteredPizzas$: Subject<Pizza[]> = new Subject<Pizza[]>();
  selectedPizza$: Subject<Pizza> = new Subject<Pizza>();

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

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
