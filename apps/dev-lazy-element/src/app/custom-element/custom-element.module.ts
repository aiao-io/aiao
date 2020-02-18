import { WithCustomElementComponent } from '@aiao/lazy-element';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomElementComponent } from './custom-element.component';

@NgModule({
  declarations: [CustomElementComponent],
  imports: [CommonModule]
})
export class CustomElementModule implements WithCustomElementComponent {
  customElementComponent = CustomElementComponent;
}
