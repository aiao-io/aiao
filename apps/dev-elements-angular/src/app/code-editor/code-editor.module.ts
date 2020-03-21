import { AiaoElementsModule } from '@aiao/elements-angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ElementsCodeEditorComponent } from './code-editor.component';

const routes: Routes = [
  {
    path: '',
    component: ElementsCodeEditorComponent
  }
];

@NgModule({
  declarations: [ElementsCodeEditorComponent],
  imports: [CommonModule, IonicModule, AiaoElementsModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class ElementsCodeEditorModule {}
