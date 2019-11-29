import { LazyElementModule } from '@aiao/lazy-element';
import { LazyRoutes } from '@aiao/lazy-module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const lazyRoutes: LazyRoutes = [
  {
    name: 'aiao-custom-element',
    loadChildren: () => import('./custom-element/custom-element.module').then(_ => _.CustomElementModule),
    matcher: () => null
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    LazyElementModule.register(lazyRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
