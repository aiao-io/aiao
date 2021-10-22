import { IAiaoElementsConfig } from '../interfaces/elements.interface';
import { config } from './config';

declare const Context: any;

export const initialize = (elementsConfig: IAiaoElementsConfig = {}) => {
  if (typeof (window as any) === 'undefined') {
    return;
  }
  const win: any = window;
  const Aiao = (win.Aiao = win.Aiao || {});
  Aiao.elements = Aiao.elements || {};
  Aiao.elements.Context = Context;

  const conf: IAiaoElementsConfig = {
    resourcesUrl: './',
    ...Aiao.elements.config,
    ...elementsConfig
  };
  config.reset(conf);
  Aiao.elements.config = config;
};

export default initialize;
