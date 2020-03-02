export class ConfigBase<T> {
  private m = new Map<keyof T, any>();

  reset(configObj: T) {
    this.m = new Map<keyof T, any>(Object.entries(configObj) as any);
  }

  get<K extends keyof T>(key: K, fallback?: any): T[K] {
    const value = this.m.get(key);
    return value || fallback;
  }

  getBoolean(key: keyof T, fallback = false): boolean {
    const val = this.m.get(key);
    if (val === undefined) {
      return fallback;
    }
    if (typeof val === 'string') {
      return val === 'true';
    }
    return !!val;
  }

  getNumber(key: keyof T, fallback?: number): number {
    const val = parseFloat(this.m.get(key));
    return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
  }

  set(key: keyof T, value: any) {
    this.m.set(key, value);
  }
}
