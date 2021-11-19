import { Injectable, NgModuleRef } from '@angular/core';

import { LazyModuleLoaderBase } from './LazyModuleLoaderBase';

@Injectable({
  providedIn: 'root'
})
export class LazyModuleLoader extends LazyModuleLoaderBase {
  async load(name: string): Promise<NgModuleRef<any>> {
    if (this.loading.has(name)) {
      return this.loading.get(name);
    }
    const moduleLoader = this.toLoad.get(name);
    if (!moduleLoader) {
      throw new Error(`module not found:${name}`);
    }
    const loadedAndRegistered = (moduleLoader() as Promise<NgModuleRef<any>>).catch(err => {
      this.loading.delete(name);
      return Promise.reject(err);
    });
    this.loading.set(name, loadedAndRegistered);
    return loadedAndRegistered;
  }
}
