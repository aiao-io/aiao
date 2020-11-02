import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ElementsPreviewComponent } from './elements-preview.component';
import { ElementsPreviewModule } from './elements-preview.module';

describe('ElementsPreviewModule', () => {
  let component: ElementsPreviewComponent;
  let fixture: ComponentFixture<ElementsPreviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ElementsPreviewModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
