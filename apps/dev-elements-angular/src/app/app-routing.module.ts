import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'code-editor',
    loadChildren: () => import('./code-editor/code-editor.module').then(_ => _.ElementsCodeEditorModule)
  },
  {
    path: 'elements-editor',
    loadChildren: () => import('./elements-editor/elements-editor.module').then(_ => _.ElementsEditorModule)
  },
  {
    path: 'elements-preview',
    loadChildren: () => import('./elements-preview/elements-preview.module').then(_ => _.ElementsPreviewModule)
  },
  {
    path: 'text-editor',
    loadChildren: () => import('./text-editor/text-editor.module').then(_ => _.TextEditorModule)
  },
  {
    path: '',
    redirectTo: 'code-editor',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
