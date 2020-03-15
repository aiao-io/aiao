import { IAiaoElementsConfig } from '../interfaces/elements.interface';
import { config } from './config';

declare const Context: any;

export default () => {
  const win: any = window;
  const aiao = (win.aiao = win.aiao || {});
  const elements: any = (aiao['elements'] = aiao['elements'] || {});
  elements.Context = Context;
  const conf: IAiaoElementsConfig = {
    resourcesUrl: './',
    ...elements.config
  };
  config.reset(conf);
  elements.config = config;
};
