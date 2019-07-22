import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PizzaComponent } from './pizza/pizza.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PizzaComponent],
  exports: [PizzaComponent]
})
export class SharedUiModule {}
