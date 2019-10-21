import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootPage } from './root.page';

const routes: Routes = [
  {
    path: '',
    component: RootPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: '**',
        loadChildren: () => import('./not-found/not-found.module').then(_ => _.NotFoundPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootRoutingModule {}
