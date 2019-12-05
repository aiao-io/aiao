import { TestBed } from '@angular/core/testing';
import { LazyRoutes, LazyModuleLoader, matcher } from '@aiao/lazy-module';
import { NgModuleFactory, Type, Injector, NgModuleRef, ComponentFactoryResolver } from '@angular/core';

describe('LazyModuleLoader', () => {
  let lazyModuleLoader: LazyModuleLoader;
  let lazymodules: LazyRoutes[];
  let aModule: FakeModuleFactory;

  beforeEach(() => {
    aModule = new FakeModuleFactory('a-module');
    lazymodules = [
      [
        {
          name: 'AModule',
          loadChildren: () => Promise.resolve(aModule),
          matcher
        }
      ]
    ];
    const injector = TestBed.configureTestingModule({
      providers: [LazyModuleLoader]
    });
    lazyModuleLoader = injector.get(LazyModuleLoader);
  });

  it('loadContainedCustomElements()', async () => {
    lazyModuleLoader.add(lazymodules);
    const m = await lazyModuleLoader.load('AModule');
    expect(m.instance).toEqual('a-module');
  });
});

class FakeModuleRef extends NgModuleRef<any> {
  instance: any;
  componentFactoryResolver: ComponentFactoryResolver;
  injector: any;

  constructor(public modulePath: string) {
    super();
    this.instance = modulePath;
  }

  destroy() {}
  onDestroy(_callback: () => void) {}
}

class FakeModuleFactory extends NgModuleFactory<any> {
  moduleType: Type<any>;
  moduleRefToCreate = new FakeModuleRef(this.modulePath);

  constructor(private modulePath: string) {
    super();
  }

  create(_parentInjector: Injector | null): NgModuleRef<any> {
    return this.moduleRefToCreate;
  }
}
