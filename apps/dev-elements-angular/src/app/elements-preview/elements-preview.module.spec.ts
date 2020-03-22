import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsPreviewComponent } from './elements-preview.component';
import { ElementsPreviewModule } from './elements-preview.module';

describe('ElementsPreviewModule', () => {
  let component: ElementsPreviewComponent;
  let fixture: ComponentFixture<ElementsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ElementsPreviewModule]
    }).compileComponents();
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
