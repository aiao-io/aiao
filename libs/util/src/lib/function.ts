import { AnyFunction } from './types';

export const isFunction = (func: any): func is AnyFunction => func && typeof func === 'function';

export const debounce = <Func extends AnyFunction>(
  func: Func,
  waitMilliseconds = 50
): ((this: ThisParameterType<Func>, ...args: Parameters<Func>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<Func>, ...args: Parameters<Func>) {
    const doLater = () => {
      timeoutId = undefined;
      func.apply(this, args);
    };
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(doLater, waitMilliseconds);
  };
};

export const throttle = <Func extends AnyFunction>(func: Func, timeFrame: number) => {
  let lastTime = 0;
  return function (this: ThisParameterType<Func>, ...args: Parameters<Func>) {
    const now = new Date().getTime();
    if (now - lastTime >= timeFrame) {
      func.apply(this, args);
      lastTime = now;
    }
  };
};
