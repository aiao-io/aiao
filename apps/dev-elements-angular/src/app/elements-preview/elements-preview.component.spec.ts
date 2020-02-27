import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsPreviewComponent } from './elements-preview.component';

describe('ElementsPreviewComponent', () => {
  let component: ElementsPreviewComponent;
  let fixture: ComponentFixture<ElementsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
