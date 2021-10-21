import { App, Plugin } from 'vue';

import { IAiaoElementsConfig, setupConfig } from '@aiao/elements';
import { applyPolyfills, defineCustomElements } from '@aiao/elements/loader';

const needsKebabCase = (version: string) => !['3.0.0', '3.0.1', '3.0.2', '3.0.3', '3.0.4', '3.0.5'].includes(version);

const toLowerCase = (eventName: string) => (eventName === 'aiaoChange' ? 'v-aiaochange' : eventName.toLowerCase());

const toKebabCase = (eventName: string) =>
  eventName === 'aiaoChange'
    ? 'v-aiao-change'
    : eventName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

const getHelperFunctions = (needKebabCase: boolean = true) => {
  const conversionFn = needKebabCase ? toKebabCase : toLowerCase;
  return {
    ael: (
      el: EventTarget,
      eventName: string,
      cb: EventListenerOrEventListenerObject,
      opts: boolean | AddEventListenerOptions
    ) => el.addEventListener(conversionFn(eventName), cb, opts),
    rel: (
      el: EventTarget,
      eventName: string,
      cb: EventListenerOrEventListenerObject,
      opts: boolean | AddEventListenerOptions
    ) => el.removeEventListener(conversionFn(eventName), cb, opts),
    ce: (eventName: string, opts: any) => new CustomEvent(conversionFn(eventName), opts)
  };
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const AiaoElementsVue: Plugin = {
  async install(app: App, config: IAiaoElementsConfig = {}) {
    if (typeof (window as any) !== 'undefined') {
      const { ael, rel, ce } = getHelperFunctions(needsKebabCase(app.version));
      setupConfig({
        ...config,
        _ael: ael,
        _rel: rel
      });
      await applyPolyfills();
      await defineCustomElements(window, {
        exclude: [],
        ce,
        ael,
        rel
      } as any);
    }
  }
};
