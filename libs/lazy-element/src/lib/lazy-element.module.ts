import { LAZY_ROUTES_TOKEN, LazyModule, LazyRoutes } from '@aiao/lazy-module';
import { CUSTOM_ELEMENTS_SCHEMA, Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { ROUTES } from '@angular/router';

import { LazyElementLoader } from './lazy-element-loader';
import { LAZY_ELEMENT_ROUTES_TOKEN } from './lazy-element-registry';
import { LazyElementDirective } from './lazy-element.directive';
import { LazyElementsComponent } from './lazy-elements.component';

@NgModule({
  imports: [LazyModule],
  declarations: [LazyElementsComponent, LazyElementDirective],
  exports: [LazyElementsComponent, LazyElementDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
          provide: LAZY_ROUTES_TOKEN,
          useValue: routes,
          multi: true
        },
        {
          provide: ROUTES,
          useValue: routes,
          multi: true
        },
        {
          provide: LAZY_ELEMENT_ROUTES_TOKEN,
          useValue: routes,
          multi: true
        }
      ]
    };
  }
}
