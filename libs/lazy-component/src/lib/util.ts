import { ComponentFactory, NgModuleRef, Type } from '@angular/core';

export const findComponentFromModuleRef = (moduleRef: NgModuleRef<any>, selector: string) => {
  // @angular < 9 或是 > 9 ivy 不开启
  const factories: Map<any, ComponentFactory<any>> = (moduleRef.componentFactoryResolver as any)._factories;
  if (factories) {
    return Array.from(factories.keys()).find(type => factories.get(type)!.selector === selector);
  }
  const customElementComponents: Type<any>[] = (moduleRef?.instance as any).customElementComponents as any;
  if (customElementComponents) {
    return customElementComponents.find((d: any) => {
      const selectorArrs: string[][] = d.ɵcmp.selectors;
      return selectorArrs.find(selectorArr => selectorArr.find(sel => sel.includes(selector)));
    });
  }
  return null;
};
