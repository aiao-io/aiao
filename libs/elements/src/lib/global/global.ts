import { IAiaoElementsConfig } from '../interfaces/elements.interface';
import { config } from './config';

declare const Context: any;

export const initialize = (userConfig: IAiaoElementsConfig = {}) => {
  if (typeof (window as any) === 'undefined') {
    return;
  }
  const win: any = window;
  const aiao = (win.aiao = win.aiao || {});
  const elements: any = (aiao['elements'] = aiao['elements'] || {});
  elements.Context = Context;

  const conf: IAiaoElementsConfig = {
    resourcesUrl: './',
    ...userConfig
  };
  config.reset(conf);
  elements.config = config;
};

export default initialize;
