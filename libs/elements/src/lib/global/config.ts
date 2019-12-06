import { IAiaoConfig } from '../interfaces/aiao.interface';

export class Config {
  private m = new Map<keyof IAiaoConfig, any>();

  reset(configObj: IAiaoConfig) {
    this.m = new Map<keyof IAiaoConfig, any>(Object.entries(configObj) as any);
  }

  get(key: keyof IAiaoConfig, fallback?: any): any {
    const value = this.m.get(key);
    return value || fallback;
  }

  getBoolean(key: keyof IAiaoConfig, fallback = false): boolean {
    const val = this.m.get(key);
    if (val === undefined) {
      return fallback;
    }
    if (typeof val === 'string') {
      return val === 'true';
    }
    return !!val;
  }

  getNumber(key: keyof IAiaoConfig, fallback?: number): number {
    const val = parseFloat(this.m.get(key));
    return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
  }

  set(key: keyof IAiaoConfig, value: any) {
    this.m.set(key, value);
  }
}

export const config = new Config();

export const configFromSession = (win: Window): any => {
  try {
    const configStr = win.sessionStorage.getItem(MLAB_SESSION_KEY);
    return configStr !== null ? JSON.parse(configStr) : {};
  } catch (e) {
    return {};
  }
};

export const saveConfig = (win: Window, c: any) => {
  try {
    win.sessionStorage.setItem(MLAB_SESSION_KEY, JSON.stringify(c));
  } catch (e) {
    return;
  }
};

export const configFromURL = (win: Window) => {
  const configObj: any = {};
  win.location.search
    .slice(1)
    .split('&')
    .map(entry => entry.split('='))
    .map(([key, value]) => [decodeURIComponent(key), decodeURIComponent(value)])
    .filter(([key]) => startsWith(key, MLAB_PREFIX))
    .map(([key, value]) => [key.slice(MLAB_PREFIX.length), value])
    .forEach(([key, value]) => {
      configObj[key] = value;
    });

  return configObj;
};

const startsWith = (input: string, search: string): boolean => {
  return input.substr(0, search.length) === search;
};

const MLAB_PREFIX = 'mlab:';
const MLAB_SESSION_KEY = 'mlab-persist-config';
