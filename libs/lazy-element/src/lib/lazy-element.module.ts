import { LazyModule } from '@aiao/lazy-module';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { LazyElementRoutes } from './lazy-element-registry';
import { createLazyElementModuleProviders } from './lazy-element.util';

@NgModule({
  imports: [LazyModule]
})
export class LazyElementModule {
  public static forChild(routes: LazyElementRoutes): ModuleWithProviders {
    return {
      ngModule: LazyModule,
      providers: createLazyElementModuleProviders(routes)
    };
  }

  public static forRoot(routes: LazyElementRoutes): ModuleWithProviders {
    return this.forChild(routes);
  }
}
