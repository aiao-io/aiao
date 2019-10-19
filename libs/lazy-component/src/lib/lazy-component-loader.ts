import { LazyModuleLoader } from '@aiao/lazy-module';
import { ComponentFactory, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyComponentLoader {
  private componentLoading = new Map<string, Promise<any>>();

  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  async load(modulePath: string, selector: string) {
    const pathSelectorKey = `${modulePath}${selector}`;
    if (this.componentLoading.has(pathSelectorKey)) {
      return this.componentLoading.get(pathSelectorKey);
    }
    const componentType = this.lazyModuleLoader.load(modulePath).then(ref => {
      const factories: Map<any, ComponentFactory<any>> = (ref.componentFactoryResolver as any)._factories;
      const find = Array.from(factories.keys()).find(type => factories.get(type).selector === selector);
      if (!find) {
        throw new Error(`not found selector:${selector}`);
      }
      return find;
    });
    this.componentLoading.set(pathSelectorKey, componentType);
    return componentType;
  }
}
