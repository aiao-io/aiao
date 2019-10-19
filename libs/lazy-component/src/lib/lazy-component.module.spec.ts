import { async, TestBed } from '@angular/core/testing';

import { LazyComponentModule } from './lazy-component.module';

describe('LazyComponentModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LazyComponentModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LazyComponentModule).toBeDefined();
  });
});
