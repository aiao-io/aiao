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
      const start = new Date().getTime();
      let runTime = 0;
      let end: number;
      const isDone = () => {
        expect(runTime).toEqual(2);
        done();
      };

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
});
