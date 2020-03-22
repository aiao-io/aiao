import { AiaoElementsModule } from '@aiao/elements-angular';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ElementsPreviewComponent } from './elements-preview.component';

describe('ElementsPreviewComponent', () => {
  let component: ElementsPreviewComponent;
  let fixture: ComponentFixture<ElementsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ElementsPreviewComponent],
      imports: [CommonModule, IonicModule, ReactiveFormsModule, AiaoElementsModule]
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
