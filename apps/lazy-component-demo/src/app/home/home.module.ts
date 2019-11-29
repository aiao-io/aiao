import { LazyComponentFactoryResolver } from 'libs/lazy-component/src/lib/lazy-component-factory-resolver';

import { LazyComponentModule } from '@aiao/lazy-component';
import { ComponentFactoryResolver, NgModule } from '@angular/core';

import { DialogComponent } from './dialog/dialog.component';
import { HomeRouterModule } from './home-router.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, DialogComponent],
  entryComponents: [DialogComponent],
  imports: [HomeRouterModule, LazyComponentModule]
})
export class HomeModule {
  constructor(lazyComponentFactoryResolver: LazyComponentFactoryResolver, localResolver: ComponentFactoryResolver) {
    lazyComponentFactoryResolver.registerResolver(localResolver);
  }
}
