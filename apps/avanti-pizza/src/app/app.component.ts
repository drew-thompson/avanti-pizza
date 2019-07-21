import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'avanti-pizza-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menu$ = this.http.get('/api/menu');

  constructor(private http: HttpClient) {}
}
