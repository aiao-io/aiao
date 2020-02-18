import { LazyElementModule } from '@aiao/lazy-element';
import { LazyModule, LazyRoutes, matcher } from '@aiao/lazy-module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const lazyRoutes: LazyRoutes = [
  {
    name: 'app-custom-element',
    loadChildren: () => import('./custom-element/custom-element.module').then(_ => _.CustomElementModule),
    matcher
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    LazyElementModule.register(lazyRoutes),
    LazyModule.register(lazyRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
