import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '@avanti-pizza/common/ui/custom-material';
import { MenuDataAccessModule } from '@avanti-pizza/menu/data-access';
import { SharedUiModule } from '@avanti-pizza/shared/ui';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MenuDataAccessModule,
    CustomMaterialModule,
    SharedUiModule,

    RouterModule.forChild([
      {
        path: '',
        component: SearchComponent
      }
    ])
  ],
  declarations: [SearchComponent]
})
export class MenuFeatureSearchModule {}
