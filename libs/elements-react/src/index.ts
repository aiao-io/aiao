import { applyPolyfills, defineCustomElements } from '@aiao/elements/loader';

if (typeof window !== 'undefined') {
  applyPolyfills().then(() => defineCustomElements(window));
}

export * from './lib/react-component-lib';
export * from './lib/proxies';
