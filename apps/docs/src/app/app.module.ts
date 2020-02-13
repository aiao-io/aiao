import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
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
import { LanguageListComponent } from './nav/language-list/language-list.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { TocComponent } from './nav/toc/toc.component';
import { ScrollSpyService } from './share/scroll-spy.service';
import { ScrollService } from './share/scroll.service';
import { TocService } from './share/toc.service';

@NgModule({
  declarations: [AppComponent, HomePage, LanguageListComponent, SideNavComponent, TocComponent, SideNavComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MatTreeModule,
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
  entryComponents: [LanguageListComponent],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ScrollService,
    ScrollSpyService,
    TocService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
