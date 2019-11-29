import { LazyModule, LazyRoutes } from '@aiao/lazy-module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const lazyRoutes: LazyRoutes = [
  {
    name: 'testModule',
    loadChildren: () => import('./test/test.module').then(_ => _.TestModule),
    matcher: () => null
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LazyModule.register(lazyRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
