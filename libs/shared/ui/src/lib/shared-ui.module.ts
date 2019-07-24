import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonPipesModule } from '@avanti-pizza/common/pipes';
import { DrinkComponent } from './drink/drink.component';
import { EmboldenedTextComponent } from './emboldened-text/emboldened-text.component';
import { PizzaComponent } from './pizza/pizza.component';

@NgModule({
  imports: [CommonModule, CommonPipesModule],
  declarations: [PizzaComponent, EmboldenedTextComponent, DrinkComponent],
  exports: [PizzaComponent, EmboldenedTextComponent, DrinkComponent]
})
export class SharedUiModule {}
