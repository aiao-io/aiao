import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'brief', pathMatch: 'full' },
  { path: 'brief', loadChildren: () => import('./brief/brief.module').then(m => m.BriefPageModule) },
  { path: 'color', loadChildren: () => import('./color/color.module').then(m => m.ColorModule) },
  { path: 'util', loadChildren: () => import('./util/util.module').then(m => m.UtilModule) },
  { path: 'lazy-module', loadChildren: () => import('./lazy-module/lazy-module.module').then(m => m.LazyModuleModule) },
  {
    path: 'lazy-component',
    loadChildren: () => import('./lazy-component/lazy-component.module').then(m => m.LazyComponentModule)
  },
  {
    path: 'lazy-element',
    loadChildren: () => import('./lazy-element/lazy-element.module').then(m => m.LazyElementModule)
  },

  {
    path: 'stencil-toolkit',
    loadChildren: () => import('./stencil-toolkit/stencil-toolkit.module').then(m => m.StencilToolkitModule)
  },
  {
    path: 'image-storage',
    loadChildren: () => import('./image-storage/image-storage.module').then(m => m.ImageStorageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
