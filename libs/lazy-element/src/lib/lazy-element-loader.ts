import { LazyModuleLoader, LazyModuleLoaderBase } from '@aiao/lazy-module';
import { Injectable } from '@angular/core';
import { createCustomElement } from '@angular/elements';

@Injectable({
  providedIn: 'root'
})
export class LazyElementLoader extends LazyModuleLoaderBase {
  constructor(private lazyModuleLoader: LazyModuleLoader) {
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

  async load(selector: string): Promise<void> {
    if (customElements.get(selector)) {
      return;
    }

    if (this.loading.has(selector)) {
      return this.loading.get(selector);
    }

    const loadedAndRegistered = this.lazyModuleLoader
      .load(selector)
      .then(moduleRef => {
        const injector = moduleRef.injector;
        const CustomElementComponent = moduleRef.instance.customElementComponent;
        const CustomElement = createCustomElement(CustomElementComponent, { injector });
        customElements.define(selector, CustomElement);
        return customElements.whenDefined(selector);
      })
      .then(() => {
        this.toLoad.delete(selector);
      })
      .catch(err => {
        this.loading.delete(selector);
        return Promise.reject(err);
      });

    this.loading.set(selector, loadedAndRegistered);
    return loadedAndRegistered;
  }

  private async loadUnRegisteredSelectors(unregisteredSelectors: string[]) {
    return Promise.all(unregisteredSelectors.map(s => this.load(s))).then(d => undefined);
  }
}
