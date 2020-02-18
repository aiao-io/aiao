import { randomString } from './randomString';
import { isString } from 'lodash';

describe('randomString', () => {
  it('randomString', () => {
    for (let i = 0; i < 100; i++) {
      const str = randomString(16);
      expect(str.length === 16).toBeTruthy();
      expect(isString(str)).toBeTruthy();
    }
  });
});
