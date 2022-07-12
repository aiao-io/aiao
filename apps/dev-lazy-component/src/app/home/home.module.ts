import { LazyComponentModule, WithIvyLazyComponent } from '@aiao/lazy-component';
import { NgModule, Type } from '@angular/core';

import { HomeDialogComponent } from './dialog/dialog.component';
import { HomeRouterModule } from './home-router.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent, HomeDialogComponent],
    imports: [HomeRouterModule, LazyComponentModule]
})
export class HomeModule implements WithIvyLazyComponent {
  customElementComponents: Type<any>[] = [HomeDialogComponent];
}
