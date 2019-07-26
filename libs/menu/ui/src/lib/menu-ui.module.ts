import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { ToppingsDataAccessModule } from '@avanti-pizza/toppings/data-access';
import { MenuAutocompleteComponent } from './menu-autocomplete/menu-autocomplete.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MenuDataAccessModule, ToppingsDataAccessModule, CustomMaterialModule, SharedUiModule],
  declarations: [MenuAutocompleteComponent],
  exports: [MenuAutocompleteComponent]
})
export class MenuUiModule {}
