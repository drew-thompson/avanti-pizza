import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: 'search',
        loadChildren: () => import('@avanti-pizza/menu/feature-search').then(m => m.MenuFeatureSearchModule)
      },
      {
        path: 'calculate',
        loadChildren: () => import('@avanti-pizza/menu/feature-calculate').then(m => m.MenuFeatureCalculateModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'search'
      }
    ])
  ]
})
export class MenuFeatureShellModule {}
