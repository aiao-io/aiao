import { findComponentFromModuleRef, matcher } from '@aiao/lazy-module';
import { ComponentFactory, ComponentFactoryResolver, NgModuleRef, Type } from '@angular/core';

describe('findComponentFromModuleRef', () => {
  it('find', () => {
    const fakeModule = new FakeModuleRef('m');
    const find = findComponentFromModuleRef(fakeModule, 'm');
    expect(find).toEqual('m');
  });
  it('matcher return null', () => {
    expect(matcher()).toEqual(null);
  });
});

class FakeComponentFactoryResolver extends ComponentFactoryResolver {
  _factories = new Map();
  constructor(modulePath: string) {
    super();
    this._factories.set(modulePath, { selector: modulePath });
  }

  resolveComponentFactory(_component: Type<any>): ComponentFactory<any> {
    return null;
  }
}

class FakeModuleRef extends NgModuleRef<any> {
  instance: any;
  componentFactoryResolver = new FakeComponentFactoryResolver(this.modulePath);
  injector: any;

  constructor(public modulePath: string) {
    super();
    this.instance = modulePath;
  }

  destroy() {}
  onDestroy(_callback: () => void) {}
}
