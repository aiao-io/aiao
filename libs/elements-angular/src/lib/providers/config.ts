import { IAiaoElementsConfig } from '@aiao/elements';
import { Injectable, InjectionToken } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Config {
  get(key: keyof IAiaoElementsConfig, fallback?: any): any {
    const c = getConfig();
    if (c) {
      return c.get(key, fallback);
    }
    return null;
  }

  getBoolean(key: keyof IAiaoElementsConfig, fallback?: boolean): boolean {
    const c = getConfig();
    if (c) {
      return c.getBoolean(key, fallback);
    }
    return false;
  }

  getNumber(key: keyof IAiaoElementsConfig, fallback?: number): number {
    const c = getConfig();
    if (c) {
      return c.getNumber(key, fallback);
    }
    return 0;
  }
}

export const AIAO_ELEMENTS_CONFIG = new InjectionToken<IAiaoElementsConfig>('AIAO_ELEMENTS_CONFIG');

const getConfig = () => {
  if (typeof (window as any) !== 'undefined') {
    const win: any = window;
    const aiao = (win.aiao = win.aiao || {});
    const elements: any = (aiao['elements'] = aiao['elements'] || {});
    if (elements.config) {
      return elements.config;
    }
  }
  return null;
};
