import { createLazyModuleProviders } from '@aiao/lazy-module';
import { Provider } from '@angular/core';

import { LAZY_ELEMENT_ROUTES_TOKEN, LazyElementRoutes } from './lazy-element-registry';

export function createLazyElementModuleProviders(routes: LazyElementRoutes): Provider[] {
  const lazyModuleRoutes = routes.map(({ selector, loadChildren }) => ({ path: selector, loadChildren }));
  return [
    ...createLazyModuleProviders(lazyModuleRoutes),
    {
      provide: LAZY_ELEMENT_ROUTES_TOKEN,
      useValue: routes,
      multi: true
    }
  ];
}
