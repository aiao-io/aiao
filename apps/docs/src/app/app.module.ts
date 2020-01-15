import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';
import { changeLanguageReducer } from './local/language.reducer';
import { LanguageListModule } from './nav/language-list/language-list.module';
import { SideNavModule } from './nav/side-nav/side-nav.module';

@NgModule({
  declarations: [AppComponent, HomePage],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SideNavModule,
    HttpClientModule,
    LanguageListModule,
    IonicModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true
        }
      }
    }),
    StoreModule.forRoot(
      { language: changeLanguageReducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }
    )
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
