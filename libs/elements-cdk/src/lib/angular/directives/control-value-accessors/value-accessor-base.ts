import type { ElementRef } from '@angular/core';

import type { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessorBase implements ControlValueAccessor {
  protected lastValue: any;

  constructor(protected el: ElementRef) {}

  writeValue(value: any) {
    this.el.nativeElement.value = this.lastValue = value == null ? '' : value;
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.el.nativeElement.disabled = isDisabled;
  }

  protected handleChangeEvent(el: HTMLElement, value: any) {
    if (el === this.el.nativeElement) {
      if (value !== this.lastValue) {
        this.lastValue = value;
        this.onChange(value);
      }
    }
  }

  protected handleBlurEvent(el: ElementRef<any>) {
    if (el === this.el.nativeElement) {
      this.onTouched();
    }
  }

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
}
