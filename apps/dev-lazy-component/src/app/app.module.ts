import { LazyModule, LazyRoutes, matcher } from '@aiao/lazy-module';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-route-module';
import { AppComponent } from './app.component';

const lazyRoutes: LazyRoutes = [
  {
    name: 'DialogModule',
    loadChildren: () => import('./dialog/dialog.module').then(_ => _.DialogModule),
    matcher
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatDialogModule, AppRoutingModule, LazyModule.register(lazyRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
