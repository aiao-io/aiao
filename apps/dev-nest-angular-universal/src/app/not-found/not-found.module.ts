import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [CommonModule, NotFoundRoutingModule],
  declarations: [NotFoundComponent],
  exports: []
})
export class NotFoundPageModule {}
