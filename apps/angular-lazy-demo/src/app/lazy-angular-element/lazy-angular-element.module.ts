import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyAngularElementComponent } from './lazy-angular-element.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LazyAngularElementComponent],
  entryComponents: [LazyAngularElementComponent]
})
export class LazyAngularElementModule {}
