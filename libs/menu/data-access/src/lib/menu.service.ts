import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pizza, PizzaMenu } from '@avanti-pizza/api-interface';
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
}
