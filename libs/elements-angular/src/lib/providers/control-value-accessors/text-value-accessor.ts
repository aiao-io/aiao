import { Directive, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
  /* eslint-disable-next-line @angular-eslint/directive-selector */
  selector: 'aiao-code-editor,aiao-code-diff-editor,aiao-elements-editor',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextValueAccessor,
      multi: true
    }
  ]
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class TextValueAccessor extends ValueAccessor {
  constructor(el: ElementRef) {
    super(el);
  }

  @HostListener('aiaoChange', ['$event.target'])
  aiaoChange(el: any) {
    this.handleChangeEvent(el, el.value);
  }
}
