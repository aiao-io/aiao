import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { APIService } from './api.service';
import { HelloRoutingModule } from './hello-routing.module';
import { HelloComponent } from './hello.component';

@NgModule({
  imports: [CommonModule, HelloRoutingModule, SharedModule],
  declarations: [HelloComponent],
  providers: [APIService]
})
export class HelloModule {}
