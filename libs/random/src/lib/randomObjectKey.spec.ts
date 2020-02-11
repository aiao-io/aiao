import { randomObjectKey } from './randomObjectKey';

describe('randomObjectKey', () => {
  it('randomObjectKey', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    };
    for (let i = 0; i < 100; i++) {
      const key = randomObjectKey(obj);
      expect(Object.keys(obj).includes(key)).toBeTruthy();
    }
  });
});
