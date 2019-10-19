import {
  APP_INITIALIZER,
  ComponentFactoryResolver,
  Inject,
  ModuleWithProviders,
  NgModule,
  Optional
} from '@angular/core';
import { ROUTES } from '@angular/router';

import { LazyComponentFactoryResolver } from './lazy-component-factory-resolver';
import { LazyComponentLoader } from './lazy-component-loader';
import { LAZY_ROUTES_TOKEN, LazyRoutes } from './lazy-component-registry';
import { lazyRootInit } from './lazy-component.util';

@NgModule()
export class LazyComponentModule {
  constructor(
    lazyComponentFactoryResolver: LazyComponentFactoryResolver,
    componentFactoryResolver: ComponentFactoryResolver,
    lazyComponentLoader: LazyComponentLoader,
    @Optional() @Inject(LAZY_ROUTES_TOKEN) lazyRoutes: LazyRoutes[]
  ) {
    lazyComponentFactoryResolver.registerResolver(componentFactoryResolver);
    if (lazyRoutes) {
      lazyComponentLoader.addLazyRoutes(lazyRoutes);
    }
  }

  public static forChild(routes: LazyRoutes): ModuleWithProviders {
    return {
      ngModule: LazyComponentModule,
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

  public static forRoot(routes: LazyRoutes): ModuleWithProviders {
    return {
      ngModule: LazyComponentModule,
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
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: lazyRootInit,
          deps: [LazyComponentFactoryResolver]
        }
      ]
    };
  }
}
