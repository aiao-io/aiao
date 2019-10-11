import { EventDispatcher } from './event';

describe('event', () => {
  it('addEventListener', done => {
    class BaseEvent extends EventDispatcher<any> {}
    const be = new BaseEvent();
    const listener = () => {
      done();
    };
    be.addEventListener('aaa', listener);
    expect(be.hasEventListener('aaa', listener)).toBeTruthy();
    be.dispatchEvent('aaa');
  });
  it('removeEventListener', () => {
    class BaseEvent extends EventDispatcher<any> {}
    const be = new BaseEvent();
    const listener = () => {};
    be.addEventListener('aaa', listener);
    expect(be.hasEventListener('aaa', listener)).toBeTruthy();
    be.removeEventListener('aaa', listener);
    expect(be.hasEventListener('aaa', listener)).toBeFalsy();
  });
  it('removeAllEventListener', () => {
    class BaseEvent extends EventDispatcher<any> {}
    const be = new BaseEvent();
    const listener = () => {};
    be.addEventListener('aaa', listener);
    be.addEventListener('bbb', listener);
    expect(be.hasEventListener('aaa', listener)).toBeTruthy();
    expect(be.hasEventListener('bbb', listener)).toBeTruthy();
    be.removeAllEventListener();
    expect(be.hasEventListener('aaa', listener)).toBeFalsy();
    expect(be.hasEventListener('bbb', listener)).toBeFalsy();
  });
});
