import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Topping, ToppingName } from '@avanti-pizza/api-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Topping[]> {
    return this.http.get<Topping[]>('/api/toppings');
  }

  findOne(name: ToppingName): Observable<Topping> {
    return this.http.get<Topping>(`/api/toppings/${name}`);
  }

  /**
   * Finds any toppings with partial or full matches with their name and the provided query.
   * @param query Part or all of a topping name that is being looked up
   */
  findAll(query: string): Observable<Topping[]> {
    return this.http.get<Topping[]>(`/api/toppings/autocomplete?q=${query}`);
  }
}
