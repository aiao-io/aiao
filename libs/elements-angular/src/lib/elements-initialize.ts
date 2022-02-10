import { IAiaoElementsConfig, initialize } from '@aiao/elements';
import { raf } from '@aiao/elements-cdk';
import { applyPolyfills, defineCustomElements } from '@aiao/elements/loader';
import { NgZone } from '@angular/core';

// 初始化
export function appInitialize(config: IAiaoElementsConfig, doc: Document, zone: NgZone) {
  return (): any => {
    const resourcesUrl = config.resourcesUrl || './';
    const win = doc.defaultView as any;
    if (win && typeof (window as any) !== 'undefined') {
      initialize({
        ...config,
        _zoneGate: (h: any) => zone.run(h)
      });

      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener';

      return applyPolyfills().then(() =>
        defineCustomElements(win, {
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
        })
      );
    }
  };
}
