import { config, configFromSession, configFromURL, saveConfig } from './config';

declare const Context: any;

export default () => {
  const win: any = window;
  const Aiao = (win.Aiao = win.Aiao || {});
  Aiao.Context = Context;

  // 读取配置
  const configObj = {
    ...configFromSession(win),
    persistConfig: false,
    ...Aiao.config,
    ...configFromURL(win)
  };

  if (config.getBoolean('persistConfig')) {
    saveConfig(win, configObj);
  }

  if (config.getBoolean('_testing')) {
    config.set('animated', false);
  }

  config.reset(configObj);
  Aiao.config = config;
};
