import { IAiaoElementsConfig } from '../interfaces/elements.interface';

export const setupConfig = (elementsConfig: IAiaoElementsConfig) => {
  const win = window as any;
  if (win.Aiao?.elements?.config?.constructor?.name !== 'Object') {
    return;
  }
  const Aiao = (win.Aiao = win.Aiao || {});
  Aiao.elements = Aiao.elements || {};
  Aiao.elements.config = {
    ...Aiao.elements.config,
    ...elementsConfig
  };
  return Aiao.elements.config;
};
