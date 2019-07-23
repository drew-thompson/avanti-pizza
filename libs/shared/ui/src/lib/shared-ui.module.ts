import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonPipesModule } from '@avanti-pizza/common/pipes';
import { EmboldenedTextComponent } from './emboldened-text/emboldened-text.component';
import { PizzaComponent } from './pizza/pizza.component';

@NgModule({
  imports: [CommonModule, CommonPipesModule],
  declarations: [PizzaComponent, EmboldenedTextComponent],
  exports: [PizzaComponent, EmboldenedTextComponent]
})
export class SharedUiModule {}
