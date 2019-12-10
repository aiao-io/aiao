import { config } from './config';

declare const Context: any;

export default () => {
  const win: any = window;
  const aiao = (win.aiao = win.aiao || {});
  const elements: any = (aiao['elements'] = aiao['elements'] || {});
  elements.Context = Context;
  config.reset(elements.config || {});
  elements.config = config;
};
