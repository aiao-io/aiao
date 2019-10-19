import { Provider } from '@angular/core';
import { ROUTES } from '@angular/router';

import { LAZY_ROUTES_TOKEN, LazyRoutes } from './lazy-module-registry';

export function createLazyModuleProviders(routes: LazyRoutes): Provider[] {
  return [
    {
      provide: LAZY_ROUTES_TOKEN,
      useValue: routes,
      multi: true
    },
    {
      provide: ROUTES,
      useValue: routes,
      multi: true
    }
  ];
}
