import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsEditorComponent } from './elements-editor.component';

describe('ElementsEditorComponent', () => {
  let component: ElementsEditorComponent;
  let fixture: ComponentFixture<ElementsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElementsEditorComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
