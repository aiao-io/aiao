import { LazyComponentFactoryResolver } from 'libs/lazy-component/src/lib/lazy-component-factory-resolver';

import { LazyModule, LazyRoutes } from '@aiao/lazy-module';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-route-module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

const lazyRoutes: LazyRoutes = [
  {
    name: 'homeModule',
    loadChildren: () => import('./home/home.module').then(_ => _.HomeModule),
    matcher: () => null
  }
];

@NgModule({
   declarations: [
      AppComponent,
      MainComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      MatDialogModule,
      AppRoutingModule,
      LazyModule.forRoot(lazyRoutes)
   ],
   providers: [
      LazyComponentFactoryResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
  constructor(lazyComponentFactoryResolver: LazyComponentFactoryResolver) {
    lazyComponentFactoryResolver.init();
  }
}
