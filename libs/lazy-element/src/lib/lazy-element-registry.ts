import { InjectionToken } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

export interface LazyElementRoute {
  selector: string;
  loadChildren: LoadChildrenCallback;
}
export type LazyElementRoutes = LazyElementRoute[];

export const LAZY_ELEMENT_ROUTES_TOKEN = new InjectionToken<LazyElementRoutes>('LAZY_ELEMENT_ROUTES_TOKEN');
