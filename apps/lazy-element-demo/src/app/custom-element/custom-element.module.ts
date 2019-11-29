import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomElementComponent } from './custom-element.component';

@NgModule({
  declarations: [CustomElementComponent],
  entryComponents: [CustomElementComponent],
  imports: [CommonModule]
})
export class CustomElementModule {}
