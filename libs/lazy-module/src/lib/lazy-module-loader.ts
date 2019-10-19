import { Compiler, Injectable, NgModuleFactory, NgModuleRef, Type } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

import { LazyRoutes } from './lazy-module-registry';

@Injectable({
  providedIn: 'root'
})
export class LazyModuleLoader {
  private modulesToLoad: Map<string, LoadChildrenCallback> = new Map();
  private modulesLoading = new Map<string, Promise<any>>();

  constructor(private moduleRef: NgModuleRef<any>, private compiler: Compiler) {}

  addLazyRoutes(lazyRoutes: LazyRoutes[]) {
    lazyRoutes.forEach(routes =>
      routes.forEach(({ path, loadChildren }) => {
        if (!this.modulesLoading.has(path)) {
          this.modulesToLoad.set(path, loadChildren);
        }
      })
    );
  }

  async load(path: string): Promise<NgModuleRef<any>> {
    if (this.modulesLoading.has(path)) {
      return this.modulesLoading.get(path);
    }

    if (this.modulesToLoad.has(path)) {
      const modulePathLoader = this.modulesToLoad.get(path);
      const loadedAndRegistered = (modulePathLoader() as Promise<Type<any>>)
        .then(moduleOrFactory => {
          if (moduleOrFactory instanceof NgModuleFactory) {
            return moduleOrFactory;
          } else {
            return this.compiler.compileModuleAsync(moduleOrFactory);
          }
        })
        .then(moduleFactory => {
          this.modulesToLoad.delete(path);
          return moduleFactory.create(this.moduleRef.injector);
        })
        .catch(err => {
          this.modulesLoading.delete(path);
          return Promise.reject(err);
        });
      this.modulesLoading.set(path, loadedAndRegistered);
      return loadedAndRegistered;
    }
    throw new Error(`module not found path:${path}`);
  }
}
