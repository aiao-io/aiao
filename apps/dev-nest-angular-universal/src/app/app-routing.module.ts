import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(_ => _.HomeModule)
  },
  {
    path: 'hello',
    loadChildren: () => import('./hello/hello.module').then(_ => _.HelloModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(_ => _.NotFoundPageModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
