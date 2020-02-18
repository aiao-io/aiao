import { LazyRoutes } from '@aiao/lazy-module';
import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';

import { LazyElementLoader } from './lazy-element-loader';
import { LAZY_ELEMENT_ROUTES_TOKEN } from './lazy-element-registry';
import { LazyElementDirective } from './lazy-element.directive';
import { LazyElementsComponent } from './lazy-elements.component';

@NgModule({
  declarations: [LazyElementsComponent, LazyElementDirective],
  exports: [LazyElementsComponent, LazyElementDirective]
})
export class LazyElementModule {
  constructor(
    lazyElementLoader: LazyElementLoader,
    @Optional() @Inject(LAZY_ELEMENT_ROUTES_TOKEN) lazyElementRoutes: LazyRoutes[]
  ) {
    if (lazyElementRoutes) {
      lazyElementLoader.add(lazyElementRoutes);
    }
  }

  public static register(routes: LazyRoutes): ModuleWithProviders<LazyElementModule> {
    return {
      ngModule: LazyElementModule,
      providers: [
        {
          provide: LAZY_ELEMENT_ROUTES_TOKEN,
          useValue: routes,
          multi: true
        }
      ]
    };
  }
}
