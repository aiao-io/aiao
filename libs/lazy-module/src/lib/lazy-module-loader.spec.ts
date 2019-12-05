import { LazyModuleLoader, LazyRoutes, matcher } from '@aiao/lazy-module';
import { ComponentFactoryResolver, Injector, NgModuleFactory, NgModuleRef, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

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
    const module_a = await lazyModuleLoader.load('AModule');
    expect(module_a.instance).toEqual('a-module');
    const module_a_again = await lazyModuleLoader.load('AModule');
    expect(module_a_again.instance).toEqual('a-module');
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
