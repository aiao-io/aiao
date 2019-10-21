import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('./docs/docs.module').then(_ => _.DocsPageModule)
  },
  { path: '', loadChildren: () => import('./root.module').then(_ => _.RootPageModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production,
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
