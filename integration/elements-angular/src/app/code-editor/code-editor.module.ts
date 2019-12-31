import { AiaoElementsModule } from '@aiao/elements-angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ElementsCodeEditorComponent } from './code-editor.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ElementsCodeEditorComponent
  }
];

@NgModule({
  declarations: [ElementsCodeEditorComponent],
  imports: [CommonModule, AiaoElementsModule, RouterModule.forChild(routes)],
  exports: [],
  providers: []
})
export class ElementsCodeEditorModule {}
