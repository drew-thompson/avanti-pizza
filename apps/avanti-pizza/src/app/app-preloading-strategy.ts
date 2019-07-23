import { PreloadingStrategy, Route } from '@angular/router';
import { of } from 'rxjs';

export class AppPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => any) {
    return route.data && route.data.preload ? load() : of(null);
  }
}
