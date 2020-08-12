import { LazyComponentLoader, LazyComponentModule } from '@aiao/lazy-component';
import { LazyModule, matcher } from '@aiao/lazy-module';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injector,
  NgModuleFactory,
  NgModuleRef,
  Type
} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

describe('LazyComponentModule', () => {
  let lazyComponentLoader: LazyComponentLoader;

  beforeEach(async(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        LazyModule.register([
          {
            name: 'a-module',
            loadChildren: () => Promise.resolve(new FakeModuleFactory('a-module')),
            matcher
          },
          {
            name: 'b-module',
            loadChildren: () => Promise.resolve(new FakeModuleFactory('b-module')),
            matcher
          }
        ]),
        LazyComponentModule.forRoot()
      ]
    });
    lazyComponentLoader = injector.inject(LazyComponentLoader);
    injector.compileComponents();
  }));

  it('should create', async () => {
    expect(LazyComponentModule).toBeDefined();
    const comp = await lazyComponentLoader.load('a-module', 'a-module');
    expect(comp).toBeTruthy();
  });
});

class FakeComponentFactoryResolver extends ComponentFactoryResolver {
  _factories = new Map();
  constructor(modulePath: string) {
    super();
    this._factories.set(modulePath, { selector: modulePath });
  }

  resolveComponentFactory(_component: Type<any>): ComponentFactory<any> {
    return null as any;
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

class FakeModuleFactory extends NgModuleFactory<any> {
  moduleType!: Type<any>;
  moduleRefToCreate = new FakeModuleRef(this.modulePath);

  constructor(private modulePath: string) {
    super();
  }

  create(_parentInjector: Injector | null): NgModuleRef<any> {
    return this.moduleRefToCreate;
  }
}
