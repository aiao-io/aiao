import { LazyComponentModule } from '@aiao/lazy-component';
import { LazyElementModule } from '@aiao/lazy-element';
import { LazyModule } from '@aiao/lazy-module';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    LazyComponentModule.forRoot(),
    LazyElementModule.forRoot([
      {
        selector: 'app-lazy-angular-element',
        loadChildren: () =>
          import('./lazy-angular-element/lazy-angular-element.module').then(d => d.LazyAngularElementModule)
      }
    ])
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
