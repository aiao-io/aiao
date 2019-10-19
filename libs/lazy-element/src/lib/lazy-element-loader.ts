import { findComponentFromModuleRef, LazyModuleLoader } from '@aiao/lazy-module';
import { Injectable } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LoadChildrenCallback } from '@angular/router';

import { LazyElementRoutes } from './lazy-element-registry';

@Injectable({
  providedIn: 'root'
})
export class LazyElementLoader {
  private toLoad: Map<string, LoadChildrenCallback> = new Map();
  private loading = new Map<string, Promise<void>>();

  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  add(lazyRoutes: LazyElementRoutes[]) {
    lazyRoutes.forEach(routes =>
      routes.forEach(({ selector, loadChildren }) => {
        if (!this.loading.has(selector)) {
          this.toLoad.set(selector, loadChildren);
        }
      })
    );
  }

  async loadFromHtmlString(htmlString: string): Promise<void> {
    const unregisteredSelectors = Array.from(this.toLoad.keys()).filter(s => htmlString.includes(s));
    if (!unregisteredSelectors.length) {
      return;
    }
    return Promise.all(unregisteredSelectors.map(s => this.load(s))).then(d => undefined);
  }

  async loadContainedCustomElements(element: HTMLElement): Promise<void> {
    const unregisteredSelectors = Array.from(this.toLoad.keys()).filter(s => element.querySelector(s));
    if (!unregisteredSelectors.length) {
      return;
    }
    return Promise.all(unregisteredSelectors.map(s => this.load(s))).then(d => undefined);
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
        const CustomElementComponent = findComponentFromModuleRef(moduleRef, selector);
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
}
