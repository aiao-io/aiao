import { randomUintByLength } from './randomUintByLength';

describe('randomUintByLength', () => {
  it('randomUintByLength', () => {
    for (let i = 0; i < 100; i++) {
      const str = randomUintByLength();
      expect(`${str}`.length === 16).toBeTruthy();
    }
  });
});
