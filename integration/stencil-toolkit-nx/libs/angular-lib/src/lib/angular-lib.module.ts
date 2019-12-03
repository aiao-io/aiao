import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyComponent } from './directives/proxies';

export const DIRECTIVES = [MyComponent];

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class AngularLibModule {}
