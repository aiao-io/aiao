import { LazyModule, LazyRoutes, matcher } from '@aiao/lazy-module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const lazyRoutes: LazyRoutes = [
  {
    name: 'testModule',
    loadChildren: () => import('./test/test.module').then(_ => _.TestModule),
    matcher
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LazyModule.register(lazyRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
