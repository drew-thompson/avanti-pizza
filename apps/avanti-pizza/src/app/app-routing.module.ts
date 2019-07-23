import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPreloadingStrategy } from './app-preloading-strategy';

const routes: Routes = [
  {
    path: 'menu',
    loadChildren: () => import('@avanti-pizza/menu/feature-shell').then(m => m.MenuFeatureShellModule),
    data: { preload: true }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu'
  }
];

@NgModule({
  providers: [AppPreloadingStrategy],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: AppPreloadingStrategy,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
