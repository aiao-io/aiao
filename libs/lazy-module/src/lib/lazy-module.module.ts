import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { LazyModuleLoader } from './lazy-module-loader';
import { LAZY_ROUTES_TOKEN, LazyRoutes } from './lazy-module-registry';
import { createLazyModuleProviders } from './lazy-module.util';

@NgModule()
export class LazyModule {
  constructor(lazyModuleLoader: LazyModuleLoader, @Optional() @Inject(LAZY_ROUTES_TOKEN) lazyRoutes: LazyRoutes[]) {
    if (lazyRoutes) {
      lazyModuleLoader.addLazyRoutes(lazyRoutes);
    }
  }

  public static forChild(routes: LazyRoutes): ModuleWithProviders {
    return {
      ngModule: LazyModule,
      providers: createLazyModuleProviders(routes)
    };
  }

  public static forRoot(routes: LazyRoutes): ModuleWithProviders {
    return this.forChild(routes);
  }
}
