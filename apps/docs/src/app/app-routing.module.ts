import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  {
    path: 'intro',
    loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionPageModule)
  },
  {
    path: 'integration',
    loadChildren: () => import('./integration/integration.module').then(m => m.IntegrationModule)
  },
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
  },
  {
    path: 'typeorm-plus',
    loadChildren: () => import('./typeorm-plus/typeorm-plus.module').then(m => m.TypeormPlusModule)
  },
  {
    path: 'elements',
    loadChildren: () => import('./elements/elements.module').then(m => m.ElementsModule)
  },
  {
    path: 'elements-angular',
    loadChildren: () => import('./elements-angular/elements-angular.module').then(m => m.ElementsAngularModule)
  },
  {
    path: 'elements-cdk',
    loadChildren: () => import('./elements-cdk/elements-cdk.module').then(m => m.ElementsCdkModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
