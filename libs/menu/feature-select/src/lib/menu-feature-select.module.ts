import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { SelectComponent } from './select/select.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,

    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: SelectComponent
      }
    ])
  ],
  declarations: [SelectComponent]
})
export class MenuFeatureSelectModule {}
