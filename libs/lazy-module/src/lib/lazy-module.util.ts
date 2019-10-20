import { ComponentFactory, NgModuleRef } from '@angular/core';

export function matcher() {
  return null;
}

export const findComponentFromModuleRef = (moduleRef: NgModuleRef<any>, selector: string) => {
  const factories: Map<any, ComponentFactory<any>> = (moduleRef.componentFactoryResolver as any)._factories;
  return Array.from(factories.keys()).find(type => factories.get(type).selector === selector);
};
