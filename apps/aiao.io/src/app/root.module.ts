import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { RootRoutingModule } from './root-routing.module';
import { RootPage } from './root.page';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, RootRoutingModule],
  declarations: [RootPage],
  providers: []
})
export class RootPageModule {}
