import { Compiler, ComponentFactoryResolver, Injector, NgModuleFactory, NgModuleRef, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LazyModuleLoader, LazyRoutes, matcher } from '../';

describe('LazyModuleLoader', () => {
  let lazyModuleLoader: LazyModuleLoader;
  let compiler: Compiler;
  let lazymodules: LazyRoutes[];
  let aModuleFactory: FakeModuleFactory;

  beforeEach(() => {
    aModuleFactory = new FakeModuleFactory('a-module');
    lazymodules = [
      [
        {
          name: 'AModule',
          loadChildren: () => Promise.resolve(aModuleFactory),
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
    const injector = TestBed.configureTestingModule({ providers: [LazyModuleLoader] });
    lazyModuleLoader = injector.inject(LazyModuleLoader);
    compiler = injector.inject(Compiler);
    lazyModuleLoader.add(lazymodules);
  });

  it('载入 NgModuleFactory', async () => {
    const module_a = await lazyModuleLoader.load('AModule');
    expect(module_a.instance).toEqual('a-module');
  });

  it('载入 NgModuleFactory 2 次 只执行创建 1 次', async () => {
    const aModuleFactoryCreate = spyOn(aModuleFactory, 'create').and.returnValue(new FakeModuleRef(''));
    await Promise.all([lazyModuleLoader.load('AModule'), lazyModuleLoader.load('AModule')]);
    expect(aModuleFactoryCreate).toHaveBeenCalledTimes(1);
  });

  it('load module', async () => {
    const compilerSpy = spyOn(compiler, 'compileModuleAsync').and.returnValue(
      Promise.resolve(new FakeModuleFactory('b-module'))
    );
    const module_b = await lazyModuleLoader.load('BModule');
    expect(compilerSpy).toHaveBeenCalledTimes(1);
    expect(module_b.instance).toEqual('b-module');
  });

  it('加载模块后添加相同命名模块将会添加无效', async () => {
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

  it('加载模块前添加相同命名模块将会替换原有模块', async () => {
    lazyModuleLoader.add([
      [
        {
          name: 'AModule',
          loadChildren: () => Promise.resolve(new FakeModuleFactory('c-module')),
          matcher
        }
      ]
    ]);

    lazyModuleLoader.load('AModule').then(aModule => {
      expect(aModule.instance).toEqual('c-module');
    });
  });

  it('不会重复运行 compileModuleAsync', async () => {
    const compilerSpy = spyOn(compiler, 'compileModuleAsync').and.returnValue(
      Promise.resolve(new FakeModuleFactory('b-module'))
    );
    await Promise.all([lazyModuleLoader.load('BModule'), lazyModuleLoader.load('BModule')]);
    expect(compilerSpy).toHaveBeenCalledTimes(1);
  });

  it('加载模块时发生网络错误', async () => {
    const compilerSpy = spyOn(compiler, 'compileModuleAsync').and.returnValue(Promise.reject('promise error'));
    try {
      await lazyModuleLoader.load('BModule');
    } catch (error) {
      expect(error).toEqual('promise error');
    }
    expect(compilerSpy).toHaveBeenCalledTimes(1);
  });

  it('加载没有的模块名', async () => {
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
  componentFactoryResolver!: ComponentFactoryResolver;
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
