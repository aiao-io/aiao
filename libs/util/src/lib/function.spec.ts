import { debounce, throttle } from './function';

describe('function', () => {
  it('should be call one', done => {
    const start = new Date().getTime();
    let runTime = 0;
    let end: number;
    function isDone() {
      if (runTime === 1 && end >= 19) {
        done();
      }
    }

    const debounceFun = debounce(() => {
      end = new Date().getTime() - start;
      runTime++;
    }, 10);
    debounceFun();
    debounceFun();
    setTimeout(() => {
      debounceFun();
    }, 9);
    setTimeout(isDone, 50);
  });

  it('should be call one', done => {
    const start = new Date().getTime();
    let runTime = 0;
    let end: number;
    function isDone() {
      if (runTime === 2) {
        done();
      }
    }

    const throttleFun = throttle(() => {
      end = new Date().getTime() - start;
      runTime++;
    }, 10);
    throttleFun();
    setTimeout(() => {
      throttleFun();
    });
    setTimeout(() => {
      throttleFun();
    }, 10);
    setTimeout(isDone, 50);
  });
});
