import { NgZone } from '@angular/core';
import { applyPolyfills, defineCustomElements } from '@stencil-toolkit-nx/stencil-lib/loader';

import { raf } from './util/raf';

let didInitialize = false;

export function initialize(doc: Document, zone: NgZone) {
  return (): any => {
    const win: Window | any | undefined = doc.defaultView as any;
    if (win) {
      if (didInitialize) {
        console.warn('angular-lib was already initialized. Make sure AngularLibModule.forRoot() is just called once.');
      }
      didInitialize = true;

      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener';

      return applyPolyfills().then(() => {
        return defineCustomElements(win, {
          exclude: [],
          syncQueue: true,
          raf,
          jmp: (h: any) => zone.runOutsideAngular(h),
          ael(elm, eventName, cb, opts) {
            (elm as any)[aelFn](eventName, cb, opts);
          },
          rel(elm, eventName, cb, opts) {
            elm.removeEventListener(eventName, cb, opts);
          }
        });
      });
    }
  };
}
