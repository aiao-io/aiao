import { LazyModule } from '@aiao/lazy-module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LazyComponentModule } from '@aiao/lazy-component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    LazyModule.forRoot([
      {
        path: 'lazy-module-demo',
        loadChildren: () => import('./lazy-module/lazy-module.module').then(d => d.LazyModuleModule)
      },
      {
        path: 'lazy-component-demo',
        loadChildren: () => import('./lazy-dialog/lazy-dialog.module').then(d => d.LazyDialogModule)
      }
    ]),
    LazyComponentModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
