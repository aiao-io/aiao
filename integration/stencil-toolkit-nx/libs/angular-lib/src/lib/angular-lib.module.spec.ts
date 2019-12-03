import { async, TestBed } from '@angular/core/testing';
import { AngularLibModule } from './angular-lib.module';

describe('AngularLibModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularLibModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AngularLibModule).toBeDefined();
  });
});
