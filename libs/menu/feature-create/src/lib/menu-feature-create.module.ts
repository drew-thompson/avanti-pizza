import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { MenuUiModule } from '@avanti-pizza/menu/ui';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { ToppingsDataAccessModule } from '@avanti-pizza/toppings/data-access';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuDataAccessModule,
    ToppingsDataAccessModule,
    CustomMaterialModule,
    MenuUiModule,
    SharedUiModule,

    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: CreateComponent
      }
    ])
  ],
  declarations: [CreateComponent]
})
export class MenuFeatureCreateModule {}
