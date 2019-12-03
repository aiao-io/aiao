import { JSX } from '@stencil-toolkit-nx/stencil-lib';

import { createReactComponent } from './createComponent';

export const MyComponent = /*@__PURE__*/ createReactComponent<JSX.MyComponent, HTMLMyComponentElement>('my-component');
