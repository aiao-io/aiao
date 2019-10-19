import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { LazyElementLoader } from './lazy-element-loader';

@Component({
  selector: 'aiao-lazy-element',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyElementComponent implements OnInit {
  @Input() selector = '';

  constructor(private elementRef: ElementRef<HTMLElement>, private elementsLoader: LazyElementLoader) {}

  async ngOnInit() {
    if (!this.selector || /[^\w-]/.test(this.selector)) {
      console.error(new Error(`Invalid selector for 'aiao-lazy-element': ${this.selector}`));
      return;
    }
    await this.elementsLoader.load(this.selector);
    this.elementRef.nativeElement.innerHTML = this.elementRef.nativeElement.outerHTML
      .replace(/^<aiao-lazy-element/, `<${this.selector}`)
      .replace(/<\/aiao-lazy-element>$/, `</${this.selector}>`);
  }
}
