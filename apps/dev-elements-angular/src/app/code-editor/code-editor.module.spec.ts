import { AiaoElementsModule } from '@aiao/elements-angular';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementsCodeEditorComponent } from './code-editor.component';
import { ElementsCodeEditorModule } from './code-editor.module';

describe('ElementsCodeEditorModule', () => {
  let component: ElementsCodeEditorComponent;
  let fixture: ComponentFixture<ElementsCodeEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ElementsCodeEditorModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsCodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
