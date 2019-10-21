import { LazyComponentModule } from '@aiao/lazy-component';
import { LazyElementModule } from '@aiao/lazy-element';
import { LazyModule, matcher } from '@aiao/lazy-module';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
    LazyModule.register([
      {
        name: 'lazy-module-demo',
        matcher,
        loadChildren: () => import('./lazy-module/lazy-module.module').then(d => d.LazyModuleModule)
      },
      {
        name: 'lazy-component-demo',
        matcher,
        loadChildren: () => import('./lazy-dialog/lazy-dialog.module').then(d => d.LazyDialogModule)
      }
    ]),
    LazyComponentModule.forRoot(),
    LazyElementModule.register([
      {
        name: 'app-lazy-angular-element',
        matcher,
        loadChildren: () =>
          import('./lazy-angular-element/lazy-angular-element.module').then(d => d.LazyAngularElementModule)
      }
    ])
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
