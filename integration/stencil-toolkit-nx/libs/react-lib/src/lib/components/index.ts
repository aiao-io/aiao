export * from './proxies';
import { defineCustomElements } from '@stencil-toolkit-nx/stencil-lib/loader';

// TODO: defineCustomElements() is asyncronous
// We need to use the promise
defineCustomElements(window);
