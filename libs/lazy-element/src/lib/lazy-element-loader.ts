import { LazyModuleLoaderBase } from '@aiao/lazy-module';
import { Compiler, Injectable, NgModuleFactory, NgModuleRef, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@Injectable({
  providedIn: 'root'
})
export class LazyElementLoader extends LazyModuleLoaderBase {
  constructor(private moduleRef: NgModuleRef<any>, private compiler: Compiler) {
    super();
  }

  async loadFromHtmlString(htmlString: string): Promise<void> {
    const unregisteredSelectors = this.toLoadKeys().filter(s => htmlString.includes(s));
    if (!unregisteredSelectors.length) {
      return;
    }
    return this.loadUnRegisteredSelectors(unregisteredSelectors);
  }

  async loadFromHtmlElement(element: HTMLElement): Promise<void> {
    const unregisteredSelectors = this.toLoadKeys().filter(s => element.querySelector(s));
    if (!unregisteredSelectors.length) {
      return;
    }
    return this.loadUnRegisteredSelectors(unregisteredSelectors);
  }

  async load(selector: string) {
    if (customElements.get(selector)) {
      return;
    }

    if (this.loading.has(selector)) {
      return this.loading.get(selector);
    }

    const moduleLoader = this.toLoad.get(selector);
    if (!moduleLoader) {
      throw new Error(`element not found:${selector}`);
    }

    const loadedAndRegistered = (moduleLoader() as Promise<Type<any>>)
      .then(moduleOrFactory => {
        if (moduleOrFactory instanceof NgModuleFactory) {
          return moduleOrFactory;
        } else {
          return this.compiler.compileModuleAsync(moduleOrFactory);
        }
      })
      .then(moduleFactory => moduleFactory.create(this.moduleRef.injector))
      .then(moduleRef => {
        const injector = moduleRef.injector;
        const customElementComponent = moduleRef.instance.customElementComponent;
        const customElement = createCustomElement(customElementComponent, { injector });
        customElements.define(selector, customElement);
        this.toLoad.delete(selector);
        return customElements.whenDefined(selector);
      })
      .catch(err => {
        this.loading.delete(selector);
        return Promise.reject(err);
      });
    this.loading.set(selector, loadedAndRegistered);
    return loadedAndRegistered;
  }

  private async loadUnRegisteredSelectors(unregisteredSelectors: string[]) {
    return Promise.all(unregisteredSelectors.map(s => this.load(s))).then(() => {});
  }
}
