import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsEditorComponent } from './elements-editor.component';
import { ElementsEditorModule } from './elements-editor.module';

describe('ElementsEditorModule', () => {
  let component: ElementsEditorComponent;
  let fixture: ComponentFixture<ElementsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ElementsEditorModule]
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
