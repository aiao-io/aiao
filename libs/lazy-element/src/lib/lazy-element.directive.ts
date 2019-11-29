import { Directive, ElementRef, Input } from '@angular/core';

import { LazyElementBase } from './lazy-element-base';
import { LazyElementLoader } from './lazy-element-loader';

@Directive({
  selector: '[aiaoLazyElement]'
})
export class LazyElementDirective extends LazyElementBase {
  @Input()
  set aiaoLazyElement(value: string) {
    this.html$.next(value);
  }

  constructor(elementRef: ElementRef<HTMLElement>, elementsLoader: LazyElementLoader) {
    super(elementRef, elementsLoader);
  }
}
