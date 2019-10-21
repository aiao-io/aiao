import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyDialogComponent } from './lazy-dialog.component';
import { LazyComponentModule } from '@aiao/lazy-component';

@NgModule({
  imports: [CommonModule, LazyComponentModule],
  declarations: [LazyDialogComponent],
  entryComponents: [LazyDialogComponent]
})
export class LazyDialogModule {}
