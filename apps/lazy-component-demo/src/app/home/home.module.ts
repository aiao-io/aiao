import { LazyComponentModule } from '@aiao/lazy-component';
import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog/dialog.component';
import { HomeRouterModule } from './home-router.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, DialogComponent],
  entryComponents: [DialogComponent],
  imports: [HomeRouterModule, LazyComponentModule]
})
export class HomeModule {}
