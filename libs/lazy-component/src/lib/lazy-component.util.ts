import { LazyComponentFactoryResolver } from './lazy-component-factory-resolver';

export const lazyRootInit = (lazyComponentFactoryResolver: LazyComponentFactoryResolver) => () =>
  lazyComponentFactoryResolver.init();
