import { raf, ValueAccessorBase } from '@aiao/elements-cdk';
import { Directive, ElementRef, HostListener } from '@angular/core';

const getClasses = (element: HTMLElement) => {
  const classList = element.classList;
  const classes = [];
  for (let i = 0; i < classList.length; i++) {
    const item = classList.item(i);
    if (item !== null && item.startsWith('ng-')) {
      classes.push(`aiao-${item.substr(3)}`);
    }
  }
  return classes;
};

const setClasses = (element: HTMLElement, classes: string[]) => {
  const classList = element.classList;
  ['aiao-valid', 'aiao-invalid', 'aiao-touched', 'aiao-untouched', 'aiao-dirty', 'aiao-pristine'].forEach(c =>
    classList.remove(c)
  );

  classes.forEach(c => classList.add(c));
};

export const setAiaoClasses = (element: ElementRef) => {
  raf(() => {
    const input = element.nativeElement as HTMLElement;
    const classes = getClasses(input);
    setClasses(input, classes);
  });
};

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class ValueAccessor extends ValueAccessorBase {
  constructor(el: ElementRef) {
    super(el);
  }

  override writeValue(value: any) {
    super.writeValue(value);
    setAiaoClasses(this.el);
  }

  override handleChangeEvent(el: HTMLElement, value: any) {
    super.handleChangeEvent(el, value);
    if (el === this.el.nativeElement) {
      setAiaoClasses(this.el);
    }
  }

  @HostListener('aiaoBlur', ['$event.target'])
  override handleBlurEvent(el: any) {
    super.handleBlurEvent(el);
    if (el === this.el.nativeElement) {
      setAiaoClasses(this.el);
    }
  }
}
