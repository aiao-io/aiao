import { debounce, throttle } from './function';

describe('function', () => {
  describe('debounce', () => {
    it('should be call one', done => {
      const start = new Date().getTime();
      let runTime = 0;
      let end: number;
      const isDone = () => {
        expect(runTime).toEqual(1);
        expect(end).toBeGreaterThanOrEqual(19);
        done();
      };

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
  });
  describe('throttle', () => {
    it('ok', done => {
      const run = jest.fn();
      const isDone = () => {
        expect(run).toBeCalled();
        expect(run).toBeCalledTimes(1);
        done();
      };

      const throttleFun = throttle(() => {
        run();
      }, 10);
      throttleFun();
      throttleFun();
      throttleFun();
      throttleFun();
      setTimeout(() => {
        throttleFun();
      });
      setTimeout(() => {
        throttleFun();
      }, 1);
      setTimeout(() => {
        throttleFun();
      }, 2);
      setTimeout(() => {
        throttleFun();
      }, 3);
      setTimeout(() => {
        throttleFun();
      }, 4);
      setTimeout(isDone, 20);
    });
  });
});
