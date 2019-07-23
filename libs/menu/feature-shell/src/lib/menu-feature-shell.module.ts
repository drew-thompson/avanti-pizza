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
        path: '',
        pathMatch: 'full',
        redirectTo: 'search'
      }
    ])
  ]
})
export class MenuFeatureShellModule {}
