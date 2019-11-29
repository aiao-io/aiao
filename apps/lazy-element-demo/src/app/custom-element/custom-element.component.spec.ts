import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomElementComponent } from './custom-element.component';

describe('CustomElementComponent', () => {
  let component: CustomElementComponent;
  let fixture: ComponentFixture<CustomElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
