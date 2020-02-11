import { randomFloat } from './randomFloat';
import { isNumber } from 'lodash';

describe('randomFloat', () => {
  it('randomFloat', () => {
    for (let i = 0; i < 100; i++) {
      const number = randomFloat(1, 2);
      expect(isNumber(number)).toBeTruthy();
    }
  });
});
