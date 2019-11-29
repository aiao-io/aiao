import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import { LazyElementBase } from './lazy-element-base';
import { LazyElementLoader } from './lazy-element-loader';

@Component({
  selector: 'aiao-lazy-elements',
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyElementsComponent extends LazyElementBase {
  @Input()
  set html(html: string) {
    this.html$.emit(html);
  }

  constructor(elementRef: ElementRef<HTMLElement>, elementsLoader: LazyElementLoader) {
    super(elementRef, elementsLoader);
  }
}
