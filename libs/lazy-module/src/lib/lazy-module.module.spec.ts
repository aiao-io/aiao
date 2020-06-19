import { TestBed } from '@angular/core/testing';

import { LAZY_ROUTES_TOKEN, LazyModule, matcher } from '../';

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
    injector.inject(LazyModule);
    expect(LazyModule).toBeDefined();
    expect(injector.inject(LAZY_ROUTES_TOKEN)[0][0].name).toEqual('AModule');
  });

  it('should create', () => {
    const injector = TestBed.configureTestingModule({
      imports: [LazyModule]
    });
    injector.inject(LazyModule);
    expect(LazyModule).toBeDefined();
  });
});
