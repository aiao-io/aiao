import { LazyComponentModule } from '@aiao/lazy-component';
import { NgModule } from '@angular/core';

import { HomeRouterModule } from './home-router.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRouterModule, LazyComponentModule]
})
export class HomeModule {}
