import { Compiler, Injectable, NgModuleFactory, NgModuleRef, Type } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

import { LazyRoutes } from './lazy-module-registry';

@Injectable({
  providedIn: 'root'
})
export class LazyModuleLoader {
  private toLoad: Map<string, LoadChildrenCallback> = new Map();
  private loading = new Map<string, Promise<any>>();

  constructor(private moduleRef: NgModuleRef<any>, private compiler: Compiler) {}

  add(lazyRoutes: LazyRoutes[]) {
    lazyRoutes.forEach(routes =>
      routes.forEach(({ name, loadChildren }) => {
        if (!this.loading.has(name)) {
          this.toLoad.set(name, loadChildren);
        }
      })
    );
  }

  async load(path: string): Promise<NgModuleRef<any>> {
    if (this.loading.has(path)) {
      return this.loading.get(path);
    }

    if (this.toLoad.has(path)) {
      const modulePathLoader = this.toLoad.get(path);
      const loadedAndRegistered = (modulePathLoader() as Promise<Type<any>>)
        .then(moduleOrFactory => {
          if (moduleOrFactory instanceof NgModuleFactory) {
            return moduleOrFactory;
          } else {
            return this.compiler.compileModuleAsync(moduleOrFactory);
          }
        })
        .then(moduleFactory => {
          this.toLoad.delete(path);
          return moduleFactory.create(this.moduleRef.injector);
        })
        .catch(err => {
          this.loading.delete(path);
          return Promise.reject(err);
        });
      this.loading.set(path, loadedAndRegistered);
      return loadedAndRegistered;
    }
    throw new Error(`module not found path:${path}`);
  }
}
