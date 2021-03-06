import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drink, DrinkAutocompleteType, Pizza, PizzaMenu, PizzaSize, PricingChart, ToppingName } from '@avanti-pizza/api-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getMenu(): Observable<PizzaMenu> {
    return this.http.get<PizzaMenu>('/api/menu');
  }

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>('/api/menu/pizzas');
  }

  calculatePrice({ size, toppings }: { size: PizzaSize; toppings: ToppingName[] }): Observable<number> {
    return this.http.get<number>(`/api/menu/pizzas/calculate?complete=false&size=${size}&toppings=${toppings.join(',')}`);
  }

  calculatePricingChart({ toppings }: { toppings: ToppingName[] }): Observable<PricingChart> {
    return this.http.get<PricingChart>(`/api/menu/pizzas/calculate?complete=true&&toppings=${toppings.join(',')}`);
  }

  findAllDrinks({ query, type }: { query: string; type?: DrinkAutocompleteType }): Observable<Drink[]> {
    return this.http.get<Drink[]>(`/api/menu/drinks/autocomplete?q=${query}&type=${type || ''}`);
  }
}
