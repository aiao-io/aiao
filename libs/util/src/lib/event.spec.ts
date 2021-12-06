import { EventDispatcher } from './event';

interface MyCustomEvent {
  customEvent1: {
    a: string;
  };
  customEvent2: {
    a: string;
  };
}

describe('event', () => {
  it('addEventListener', done => {
    class BaseEvent extends EventDispatcher<MyCustomEvent> {}
    const be = new BaseEvent();
    const listener = () => {
      done();
    };
    be.addEventListener('customEvent1', listener);
    expect(be.hasEventListener('customEvent1', listener)).toBeTruthy();
    be.dispatchEvent('customEvent1');
  });
  it('removeEventListener', () => {
    class BaseEvent extends EventDispatcher<MyCustomEvent> {}
    const be = new BaseEvent();
    const listener = () => {};
    be.addEventListener('customEvent1', listener);
    expect(be.hasEventListener('customEvent1', listener)).toBeTruthy();
    be.removeEventListener('customEvent1', listener);
    expect(be.hasEventListener('customEvent1', listener)).toBeFalsy();
  });
  it('removeAllEventListener', () => {
    class BaseEvent extends EventDispatcher<MyCustomEvent> {}
    const be = new BaseEvent();
    const listener = () => {};
    be.addEventListener('customEvent1', listener);
    be.addEventListener('customEvent2', listener);
    expect(be.hasEventListener('customEvent1', listener)).toBeTruthy();
    expect(be.hasEventListener('customEvent2', listener)).toBeTruthy();
    be.removeAllEventListener();
    expect(be.hasEventListener('customEvent1', listener)).toBeFalsy();
    expect(be.hasEventListener('customEvent2', listener)).toBeFalsy();
  });
});
