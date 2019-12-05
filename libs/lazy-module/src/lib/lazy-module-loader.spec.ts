import { LazyModuleLoader, LazyRoutes, matcher } from '@aiao/lazy-module';
import { ComponentFactoryResolver, Injector, NgModuleFactory, NgModuleRef, Type, Compiler } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('LazyModuleLoader', () => {
  let lazyModuleLoader: LazyModuleLoader;
  let lazymodules: LazyRoutes[];
  let aModule: FakeModuleFactory;
  let compiler: Compiler;

  beforeEach(() => {
    aModule = new FakeModuleFactory('a-module');
    lazymodules = [
      [
        {
          name: 'AModule',
          loadChildren: () => Promise.resolve(aModule),
          matcher
        },
        {
          name: 'BModule',
          loadChildren: () => Promise.resolve(FakeCustomElementModule),
          matcher
        },
        {
          name: 'errModule',
          loadChildren: () => Promise.resolve(FakeCustomElementModule),
          matcher
        }
      ]
    ];
    const injector = TestBed.configureTestingModule({
      providers: [LazyModuleLoader]
    });
    lazyModuleLoader = injector.get(LazyModuleLoader);
    compiler = injector.get(Compiler);

    lazyModuleLoader.add(lazymodules);
  });

  it('load NgModuleFactory', async () => {
    const module_a = await lazyModuleLoader.load('AModule');
    expect(module_a.instance).toEqual('a-module');
    const module_a_again = await lazyModuleLoader.load('AModule');
    expect(module_a_again.instance).toEqual('a-module');
  });

  it('load moduleRef', async () => {
    const compilerSpy = spyOn(compiler, 'compileModuleAsync').and.returnValue(
      Promise.resolve(new FakeModuleFactory('b-module'))
    );
    const module_b = await lazyModuleLoader.load('BModule');
    expect(compilerSpy).toHaveBeenCalledTimes(1);
    expect(module_b.instance).toEqual('b-module');
  });

  it('不重复运行初始化相同名称的module', async () => {
    lazyModuleLoader.load('AModule').then(() => {
      expect(lazyModuleLoader['toLoad'].get('AModule')).not.toEqual(1);
    });
    lazyModuleLoader.add([
      [
        {
          name: 'AModule',
          loadChildren: 1 as any,
          matcher
        }
      ]
    ]);
  });

  it('不重复运行初始化相同名称的module', async () => {
    lazyModuleLoader.add([
      [
        {
          name: 'AModule',
          loadChildren: () => Promise.resolve(1),
          matcher
        }
      ]
    ]);

    lazyModuleLoader.load('AModule').then(() => {
      expect(lazyModuleLoader['toLoad'].get('AModule')).toEqual(1);
    });
  });

  it('不重复运行 promise', async () => {
    const compilerSpy = spyOn(compiler, 'compileModuleAsync').and.returnValue(
      Promise.resolve(new FakeModuleFactory('b-module'))
    );
    await Promise.all([lazyModuleLoader.load('BModule'), lazyModuleLoader.load('BModule')]);
    expect(compilerSpy).toHaveBeenCalledTimes(1);
  });

  it('load error', async () => {
    const compilerSpy = spyOn(compiler, 'compileModuleAsync').and.returnValue(Promise.reject('promise error'));
    try {
      await lazyModuleLoader.load('BModule');
    } catch (error) {
      console.log('error', error);
      expect(error).toEqual('promise error');
    }
    expect(compilerSpy).toHaveBeenCalledTimes(1);
  });

  it('not found name', async () => {
    try {
      await lazyModuleLoader.load('myName');
    } catch (error) {
      expect(error.message).toEqual('module not found:myName');
    }
  });
});

class FakeCustomElementModule {}

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
