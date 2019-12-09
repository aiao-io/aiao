import { config } from './config';

declare const Context: any;

export default () => {
  const win: any = window;
  const Aiao = (win.Aiao = win.Aiao || {});
  Aiao.Context = Context;

  config.reset(Aiao.config);
  Aiao.config = config;
};
