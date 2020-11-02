import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextEditorComponent } from './text-editor.component';
import { TextEditorModule } from './text-editor.module';

describe('ElementsPreviewModule', () => {
  let component: TextEditorComponent;
  let fixture: ComponentFixture<TextEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [TextEditorModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
