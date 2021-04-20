import { Compiler, Injectable, NgModuleFactory, NgModuleRef, Type } from '@angular/core';

import { LazyModuleLoaderBase } from './LazyModuleLoaderBase';

@Injectable({
  providedIn: 'root'
})
export class LazyModuleLoader extends LazyModuleLoaderBase {
  constructor(private moduleRef: NgModuleRef<any>, private compiler: Compiler) {
    super();
  }

  async load(name: string): Promise<NgModuleRef<any>> {
    if (this.loading.has(name)) {
      return this.loading.get(name);
    }
    const moduleLoader = this.toLoad.get(name);
    if (!moduleLoader) {
      throw new Error(`module not found:${name}`);
    }
    const loadedAndRegistered = (moduleLoader() as Promise<Type<any>>)
      .then(moduleOrFactory => {
        if (moduleOrFactory instanceof NgModuleFactory) {
          return moduleOrFactory;
        } else {
          return this.compiler.compileModuleAsync(moduleOrFactory);
        }
      })
      .then(moduleFactory => {
        this.toLoad.delete(name);
        return moduleFactory.create(this.moduleRef.injector);
      })
      .catch(err => {
        this.loading.delete(name);
        return Promise.reject(err);
      });
    this.loading.set(name, loadedAndRegistered);
    return loadedAndRegistered;
  }
}
