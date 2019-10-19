import { ROUTES } from '@angular/router';

import { LAZY_ROUTES_TOKEN, LazyRoutes } from './lazy-module-registry';

export const createLazyModuleProviders = (routes: LazyRoutes) => [
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
