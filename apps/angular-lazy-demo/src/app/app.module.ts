import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LazyModule } from '@aiao/lazy-module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    LazyModule.forRoot([
      {
        path: 'lazy-module',
        loadChildren: () => import('./lazy-module/lazy-module.module').then(d => d.LazyModuleModule)
      }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
