import { NgModule, ComponentFactoryResolver } from '@angular/core';

import { HomeRouterModule } from './home-router.module';
import { HomeComponent } from './home.component';
import { DialogComponent } from './dialog/dialog.component';
import { LazyComponentFactoryResolver } from 'libs/lazy-component/src/lib/lazy-component-factory-resolver';
import { LazyComponentModule } from '@aiao/lazy-component';

@NgModule({
  declarations: [HomeComponent, DialogComponent],
  entryComponents: [DialogComponent],
  imports: [HomeRouterModule, LazyComponentModule,]
})
export class HomeModule {
  constructor(lazyComponentFactoryResolver: LazyComponentFactoryResolver, localResolver: ComponentFactoryResolver) {
    lazyComponentFactoryResolver.registerResolver(localResolver);
  }
}
