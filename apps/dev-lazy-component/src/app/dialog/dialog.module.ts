import { WithLazyComponent } from '@aiao/lazy-component';
import { NgModule, Type } from '@angular/core';

import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [DialogComponent]
})
export class DialogModule implements WithLazyComponent {
  customElementComponents: Type<any>[] = [DialogComponent];
}
