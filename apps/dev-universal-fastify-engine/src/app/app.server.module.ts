import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { UniversalInterceptorService } from './shared/interceptors/universal-interceptor.service';

@NgModule({
  imports: [AppModule, ServerModule, ServerTransferStateModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptorService,
      multi: true
    }
  ]
})
export class AppServerModule {}
