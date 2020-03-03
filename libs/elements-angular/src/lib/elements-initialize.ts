import { IAiaoElementsConfig } from '@aiao/elements';
import { raf } from '@aiao/elements-cdk/angular';
import { applyPolyfills, defineCustomElements } from '@aiao/elements/loader';
import { NgZone } from '@angular/core';

let didInitialize = false;

// 初始化
export function initialize(config: IAiaoElementsConfig, doc: Document, zone: NgZone) {
  return (): any => {
    let { resourcesUrl } = config;
    resourcesUrl = resourcesUrl || './';
    const win = doc.defaultView as any;
    if (win && typeof (window as any) !== 'undefined') {
      if (didInitialize) {
        console.warn('Make sure AiaoElementsModule.forRoot() is just called once.');
      }
      didInitialize = true;
      const aiao = (win.aiao = win.aiao || {});
      const elements: any = (aiao['elements'] = aiao['elements'] || {});

      elements.config = {
        ...config,
        resourcesUrl,
        _zoneGate: (h: any) => zone.run(h)
      };

      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener';

      return applyPolyfills().then(() => {
        return defineCustomElements(win, {
          resourcesUrl,
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
