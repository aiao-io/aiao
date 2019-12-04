import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularLibModule } from '@stencil-toolkit-nx/angular-lib';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AngularLibModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
