import { LazyModuleLoader } from '@aiao/lazy-module';
import { Injectable, Type } from '@angular/core';

import { findComponentFromModuleRef } from './util';

@Injectable({
  providedIn: 'root'
})
export class LazyComponentLoader {
  private loading = new Map<string, Promise<any>>();

  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  async load(modulePath: string, selector: string): Promise<Type<any>> {
    const pathSelectorKey = `${modulePath}${selector}`;
    if (this.loading.has(pathSelectorKey)) {
      return this.loading.get(pathSelectorKey);
    }

    const componentType = this.lazyModuleLoader.load(modulePath).then(moduleRef => {
      const find = findComponentFromModuleRef(moduleRef, selector);
      if (!find) {
        throw new Error(`not found selector:${selector}`);
      }
      return find;
    });
    this.loading.set(pathSelectorKey, componentType);
    return componentType;
  }
}
