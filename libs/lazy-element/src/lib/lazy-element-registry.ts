import { LazyRoutes } from '@aiao/lazy-module';
import { InjectionToken, Type } from '@angular/core';

export const LAZY_ELEMENT_ROUTES_TOKEN = new InjectionToken<LazyRoutes>('LAZY_ELEMENT_ROUTES_TOKEN');

export interface WithCustomElementComponent {
  customElementComponent: Type<any>;
}
