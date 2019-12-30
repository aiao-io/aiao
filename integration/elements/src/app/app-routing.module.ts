import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'code-editor',
    loadChildren: () => import('./code-editor/code-editor.module').then(_ => _.ElementsCodeEditorModule)
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
