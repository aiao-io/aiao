import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'aiao-code-editor,aiao-code-diff-editor,aiao-elements-editor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextValueAccessor,
      multi: true
    }
  ]
})
export class TextValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }

  @HostListener('aiaoChange', ['$event.target'])
  aiaoChange(el: any) {
    this.handleChangeEvent(el, el.value);
  }
}
