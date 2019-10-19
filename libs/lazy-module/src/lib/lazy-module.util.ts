import { ComponentFactory, NgModuleRef, Provider } from '@angular/core';
import { ROUTES } from '@angular/router';

import { LAZY_ROUTES_TOKEN, LazyRoutes } from './lazy-module-registry';

const matcher = () => null;

export function createLazyModuleProviders(lazyRoutes: LazyRoutes): Provider[] {
  const routes = lazyRoutes.map(({ loadChildren }) => ({ matcher, loadChildren }));
  return [
    {
      provide: LAZY_ROUTES_TOKEN,
      useValue: lazyRoutes,
      multi: true
    },
    {
      provide: ROUTES,
      useValue: routes,
      multi: true
    }
  ];
}

export const findComponentFromModuleRef = (moduleRef: NgModuleRef<any>, selector: string) => {
  const factories: Map<any, ComponentFactory<any>> = (moduleRef.componentFactoryResolver as any)._factories;
  return Array.from(factories.keys()).find(type => factories.get(type).selector === selector);
};
