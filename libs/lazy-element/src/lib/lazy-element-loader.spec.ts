import { matcher } from '@aiao/lazy-module';
import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  NgModuleFactory,
  NgModuleRef,
  Type
} from '@angular/core';
import { fakeAsync, flushMicrotasks, TestBed, waitForAsync } from '@angular/core/testing';

import { LazyElementLoader } from './lazy-element-loader';
import { LazyElementModule } from './lazy-element.module';

describe('LazyElementLoader', () => {
  let lazyElementLoader: LazyElementLoader;
  beforeEach(
    waitForAsync(() => {
      const injector = TestBed.configureTestingModule({
        imports: [
          LazyElementModule.register([
            {
              name: 'element-a-selector',
              loadChildren: () => Promise.resolve(new FakeModuleFactory('element-a-module')),
              matcher
            },
            {
              name: 'element-b-selector',
              loadChildren: () => Promise.resolve(new FakeModuleFactory('element-a-module')),
              matcher
            },
            {
              name: 'element-c-selector',
              loadChildren: () => Promise.resolve(FakeCustomElementModule),
              matcher
            }
          ])
        ]
      });
      lazyElementLoader = injector.inject(LazyElementLoader);
    })
  );

  describe('loadFromHtmlElement()', () => {
    let loadCustomElementSpy: jest.SpyInstance;

    beforeEach(() => (loadCustomElementSpy = jest.spyOn(lazyElementLoader, 'load')));

    it('should create', fakeAsync(() => {
      expect(loadCustomElementSpy).not.toHaveBeenCalled();
      const hostEl = document.createElement('div');
      hostEl.innerHTML = `
        <element-a-selector></element-a-selector>
        <element-b-selector></element-b-selector>
      `;
      lazyElementLoader.loadFromHtmlElement(hostEl);
      flushMicrotasks();
      expect(loadCustomElementSpy).toHaveBeenCalledTimes(2);
      expect(loadCustomElementSpy).toHaveBeenCalledWith('element-a-selector');
      expect(loadCustomElementSpy).toHaveBeenCalledWith('element-b-selector');
    }));

    it('should attempt to load and register only contained elements', fakeAsync(() => {
      expect(loadCustomElementSpy).not.toHaveBeenCalled();
      lazyElementLoader.loadFromHtmlString(`<element-b-selector></element-b-selector>`);
      flushMicrotasks();
      expect(loadCustomElementSpy).toHaveBeenCalledTimes(1);
      expect(loadCustomElementSpy).toHaveBeenCalledWith('element-b-selector');
    }));
  });
});

class FakeCustomElementModule {}

class FakeComponentFactory extends ComponentFactory<any> {
  selector!: string;
  componentType!: Type<any>;
  ngContentSelectors!: string[];
  inputs = [{ propName: this.identifyingInput, templateName: this.identifyingInput }];
  outputs = [];

  constructor(private identifyingInput: string) {
    super();
  }

  create(
    _injector: Injector,
    _projectableNodes?: any[][],
    _rootSelectorOrNode?: string | any,
    _ngModule?: NgModuleRef<any>
  ): ComponentRef<any> {
    return jasmine.createSpy('ComponentRef') as any;
  }
}

class FakeComponentFactoryResolver extends ComponentFactoryResolver {
  constructor(private modulePath: string) {
    super();
  }

  resolveComponentFactory(_component: Type<any>): ComponentFactory<any> {
    return new FakeComponentFactory(this.modulePath);
  }
}

class FakeModuleRef extends NgModuleRef<any> {
  injector = {
    get: () => this.componentFactoryResolver
  };
  componentFactoryResolver = new FakeComponentFactoryResolver(this.modulePath);
  instance: any = new FakeCustomElementModule();

  constructor(private modulePath: string) {
    super();
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
