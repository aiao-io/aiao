import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsCodeEditorComponent } from './code-editor.component';
import { ElementsCodeEditorModule } from './code-editor.module';

describe('ElementsCodeEditorModule', () => {
  let component: ElementsCodeEditorComponent;
  let fixture: ComponentFixture<ElementsCodeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ElementsCodeEditorModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
