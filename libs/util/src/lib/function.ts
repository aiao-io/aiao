import { AnyFunction } from './types';

export const isFunction = (func: any): func is AnyFunction => func && typeof func === 'function';

export const debounce = <Func extends AnyFunction>(
  func: Func,
  waitMilliseconds = 50,
  isImmediate = false
): ((this: ThisParameterType<Func>, ...args: Parameters<Func>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<Func>, ...args: Parameters<Func>) {
    const context = this;
    const doLater = () => {
      timeoutId = undefined;
      if (!isImmediate) {
        func.apply(context, args);
      }
    };

    const shouldCallNow = isImmediate && timeoutId === undefined;
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  };
};

export const throttle = <Func extends AnyFunction>(func: Func, timeFrame: number) => {
  let lastTime = 0;
  return function (this: ThisParameterType<Func>, ...args: Parameters<Func>) {
    const context = this;
    const now = new Date().getTime();
    if (now - lastTime >= timeFrame) {
      func.apply(context, args);
      lastTime = now;
    }
  };
};
