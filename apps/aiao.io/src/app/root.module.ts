import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RootRoutingModule } from './root-routing.module';
import { RootPage } from './root.page';

@NgModule({
  imports: [CommonModule, RootRoutingModule],
  declarations: [RootPage],
  providers: []
})
export class RootPageModule {}
