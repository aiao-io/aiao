import { LazyComponentModule, WithIvyLazyComponent } from '@aiao/lazy-component';
import { NgModule, Type } from '@angular/core';

import { AloneDialogComponent } from './alone-dialog.component';

@NgModule({
  declarations: [AloneDialogComponent],
  imports: [LazyComponentModule],
  entryComponents: [AloneDialogComponent]
})
export class AloneDialogModule implements WithIvyLazyComponent {
  customElementComponents: Type<any>[] = [AloneDialogComponent];
}
