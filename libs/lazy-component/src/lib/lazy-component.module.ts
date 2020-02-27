import { APP_INITIALIZER, ComponentFactoryResolver, ModuleWithProviders, NgModule } from '@angular/core';

import { LazyComponentFactoryResolver } from './lazy-component-factory-resolver';
import { lazyRootInit } from './lazy-component.util';

@NgModule()
export class LazyComponentModule {
  constructor(
    lazyComponentFactoryResolver: LazyComponentFactoryResolver,
    componentFactoryResolver: ComponentFactoryResolver
  ) {
    lazyComponentFactoryResolver.registerResolver(componentFactoryResolver);
  }

  public static forRoot(): ModuleWithProviders<LazyComponentModule> {
    return {
      ngModule: LazyComponentModule,
      providers: [
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
