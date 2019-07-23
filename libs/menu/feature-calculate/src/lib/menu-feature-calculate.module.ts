import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { ToppingsDataAccessModule } from '@avanti-pizza/toppings/data-access';
import { CalculateComponent } from './calculate/calculate.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuDataAccessModule,
    ToppingsDataAccessModule,
    CustomMaterialModule,
    SharedUiModule,

    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: CalculateComponent
      }
    ])
  ],
  declarations: [CalculateComponent]
})
export class MenuFeatureCalculateModule {}
