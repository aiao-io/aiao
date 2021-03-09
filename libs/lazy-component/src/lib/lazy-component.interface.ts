import { Type } from '@angular/core';

export interface WithLazyComponent {
  customElementComponents: Type<any>[];
}
