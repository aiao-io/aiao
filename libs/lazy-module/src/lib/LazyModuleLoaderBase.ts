import { LoadChildrenCallback } from '@angular/router';

import { LazyRoutes } from './lazy-module-registry';

export abstract class LazyModuleLoaderBase {
  protected toLoad: Map<string, LoadChildrenCallback> = new Map();
  protected loading = new Map<string, Promise<any>>();

  protected toLoadKeys() {
    return Array.from(this.toLoad.keys());
  }

  add(lazyRoutes: LazyRoutes[]) {
    lazyRoutes.forEach(routes =>
      routes.forEach(({ name, loadChildren }) => {
        if (!this.loading.has(name)) {
          this.toLoad.set(name, loadChildren);
        }
      })
    );
  }
}
