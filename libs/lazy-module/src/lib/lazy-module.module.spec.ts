import { LAZY_ROUTES_TOKEN, LazyModule, matcher } from '@aiao/lazy-module';
import { TestBed } from '@angular/core/testing';

describe('LazyModule', () => {
  it('should create', () => {
    const injector = TestBed.configureTestingModule({
      imports: [
        LazyModule.register([
          {
            name: 'AModule',
            loadChildren: () => Promise.resolve(),
            matcher
          }
        ])
      ]
    });
    injector.get(LazyModule);
    expect(LazyModule).toBeDefined();
    expect(injector.get(LAZY_ROUTES_TOKEN)[0][0].name).toEqual('AModule');
  });

  it('should create', () => {
    const injector = TestBed.configureTestingModule({
      imports: [LazyModule]
    });
    injector.get(LazyModule);
    expect(LazyModule).toBeDefined();
  });
});
