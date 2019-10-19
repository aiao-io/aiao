import { async, TestBed } from '@angular/core/testing';
import { LazyElementModule } from './lazy-element.module';

describe('LazyElementModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LazyElementModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LazyElementModule).toBeDefined();
  });
});
