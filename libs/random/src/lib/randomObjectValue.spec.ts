import { randomObjectValue } from './randomObjectValue';

describe('randomObjectValue', () => {
  it('randomObjectValue', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    };
    for (let i = 0; i < 100; i++) {
      const val = randomObjectValue(obj);
      expect(Object.values(obj).includes(val)).toBeTruthy();
    }
  });
});
