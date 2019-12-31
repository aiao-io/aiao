import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AiaoElementsModule } from '@aiao/elements-angular';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AiaoElementsModule.forRoot({})],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
