import { LazyModule } from '@aiao/lazy-module';
import { CUSTOM_ELEMENTS_SCHEMA, Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { LazyElementLoader } from './lazy-element-loader';
import { LAZY_ELEMENT_ROUTES_TOKEN, LazyElementRoutes } from './lazy-element-registry';
import { LazyElementComponent } from './lazy-element.component';
import { createLazyElementModuleProviders } from './lazy-element.util';
import { LazyElementsComponent } from './lazy-elements.component';

@NgModule({
  imports: [LazyModule],
  declarations: [LazyElementComponent, LazyElementsComponent],
  exports: [LazyElementComponent, LazyElementsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LazyElementModule {
  constructor(
    lazyElementLoader: LazyElementLoader,
    @Optional() @Inject(LAZY_ELEMENT_ROUTES_TOKEN) lazyElementRoutes: LazyElementRoutes[]
  ) {
    if (lazyElementRoutes) {
      lazyElementLoader.add(lazyElementRoutes);
    }
  }

  public static forChild(routes: LazyElementRoutes): ModuleWithProviders {
    return {
      ngModule: LazyElementModule,
      providers: createLazyElementModuleProviders(routes)
    };
  }

  public static forRoot(routes: LazyElementRoutes): ModuleWithProviders {
    return {
      ngModule: LazyElementModule,
      providers: createLazyElementModuleProviders(routes)
    };
  }
}
