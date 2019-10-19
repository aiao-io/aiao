import { InjectionToken, Type } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

export interface LazyRoute {
  path: string;
  loadChildren: LoadChildrenCallback;
}
export type LazyRoutes = LazyRoute[];

export type LoadComponentCallback = () => Promise<Type<any>>;

export const LAZY_ROUTES_TOKEN = new InjectionToken<LazyRoutes>('LAZY_ROUTES_TOKEN');
