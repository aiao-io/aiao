import { async, TestBed } from '@angular/core/testing';
import { ElementsAngularModule } from './elements-angular.module';

describe('ElementsAngularModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ElementsAngularModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ElementsAngularModule).toBeDefined();
  });
});
