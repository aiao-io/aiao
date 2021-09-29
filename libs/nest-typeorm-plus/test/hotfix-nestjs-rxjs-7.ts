// 给 rxjs6 加入部分 rxjs 7 功能
// copy https://github.com/ReactiveX/rxjs/blob/master/src/internal/lastValueFrom.ts

import * as rxjs from 'rxjs';

Object.defineProperty(rxjs, 'lastValueFrom', {
  value: lastValueFrom
});
export interface LastValueFromConfig<T> {
  defaultValue: T;
}
export function lastValueFrom<T, D>(source: rxjs.Observable<T>, config: LastValueFromConfig<D>): Promise<T | D>;
export function lastValueFrom<T>(source: rxjs.Observable<T>): Promise<T>;
export function lastValueFrom<T, D>(source: rxjs.Observable<T>, config?: LastValueFromConfig<D>): Promise<T | D> {
  const hasConfig = typeof config === 'object';
  return new Promise<T | D>((resolve, reject) => {
    let _hasValue = false;
    let _value: T;
    source.subscribe({
      next: value => {
        _value = value;
        _hasValue = true;
      },
      error: reject,
      complete: () => {
        if (_hasValue) {
          resolve(_value);
        } else if (hasConfig) {
          resolve(config!.defaultValue);
        } else {
          reject(new rxjs.EmptyError());
        }
      }
    });
  });
}
