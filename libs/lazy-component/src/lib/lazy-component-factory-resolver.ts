import { ComponentFactory, ComponentFactoryResolver, Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LazyComponentFactoryResolver extends ComponentFactoryResolver {
  private rootResolve!: (component: Type<any>) => ComponentFactory<any>;

  private inCall = false;

  private readonly resolvers = new Map<ComponentFactoryResolver, (component: Type<any>) => ComponentFactory<any>>();

  constructor(private readonly rootResolver: ComponentFactoryResolver) {
    super();
  }

  init() {
    this.rootResolve = this.rootResolver.resolveComponentFactory;
    if (this.resolveComponentFactory) {
      this.rootResolver.resolveComponentFactory = this.resolveComponentFactory;
    }
  }

  public registerResolver(resolver: ComponentFactoryResolver) {
    const original = resolver.resolveComponentFactory;
    this.resolvers.set(resolver, original);
    if (!this.rootResolve) {
      this.init();
    }
  }

  public resolveComponentFactory = <T>(component: Type<T>): ComponentFactory<T> => {
    // Prevents cyclic calls.
    if (this.inCall) {
      return null as any;
    }

    this.inCall = true;
    try {
      const result = this.resolveInternal(component);
      return result;
    } finally {
      this.inCall = false;
    }
  };

  private resolveInternal = <T>(component: Type<T>): ComponentFactory<T> => {
    for (const [resolver, fn] of Array.from(this.resolvers.entries())) {
      try {
        const factory = fn.call(resolver, component);
        if (factory) {
          return factory;
        }
      } catch {}
    }
    return this.rootResolve.call(this.rootResolver, component);
  };
}
