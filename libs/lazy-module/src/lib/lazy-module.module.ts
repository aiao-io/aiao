import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { ROUTES } from '@angular/router';

import { LazyModuleLoader } from './lazy-module-loader';
import { LAZY_ROUTES_TOKEN, LazyRoutes } from './lazy-module-registry';

@NgModule()
export class LazyModule {
  constructor(
    lazyModuleLoader: LazyModuleLoader,
    @Optional() @Inject(LAZY_ROUTES_TOKEN) lazyModuleRoutes: LazyRoutes[]
  ) {
    if (lazyModuleRoutes) {
      lazyModuleLoader.add(lazyModuleRoutes);
    }
  }

  public static register(routes: LazyRoutes): ModuleWithProviders<LazyModule> {
    return {
      ngModule: LazyModule,
      providers: [
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
      ]
    };
  }
}
