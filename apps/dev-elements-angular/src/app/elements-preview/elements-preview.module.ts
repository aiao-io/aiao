import { AiaoElementsModule } from '@aiao/elements-angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ElementsPreviewComponent } from './elements-preview.component';

const routes: Routes = [
  {
    path: '',
    component: ElementsPreviewComponent
  }
];

@NgModule({
  declarations: [ElementsPreviewComponent],
  imports: [CommonModule, IonicModule, AiaoElementsModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class ElementsPreviewModule {}
