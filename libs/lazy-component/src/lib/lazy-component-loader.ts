import { Compiler, ComponentFactory, Injectable, NgModuleFactory, NgModuleRef, Type } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

import { LazyRoutes } from './lazy-component-registry';

@Injectable({
  providedIn: 'root'
})
export class LazyComponentLoader {
  private modulesToLoad: Map<string, LoadChildrenCallback> = new Map();
  private modulesLoading = new Map<string, Promise<any>>();
  private selectorLoading = new Map<string, Promise<any>>();

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

  async loadModule(path: string): Promise<NgModuleRef<any>> {
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

  async load(modulePath: string, selector: string) {
    const pathSelectorKey = `${modulePath}${selector}`;
    if (this.selectorLoading.has(pathSelectorKey)) {
      return this.selectorLoading.get(pathSelectorKey);
    }
    const componentType = this.loadModule(modulePath).then(ref => {
      const factories: Map<any, ComponentFactory<any>> = (ref.componentFactoryResolver as any)._factories;
      const find = Array.from(factories.keys()).find(type => factories.get(type).selector === selector);
      if (!find) {
        throw new Error(`not found selector:${selector}`);
      }
      return find;
    });
    this.selectorLoading.set(pathSelectorKey, componentType);
    return componentType;
  }
}
