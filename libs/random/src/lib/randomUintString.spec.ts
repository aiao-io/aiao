import { randomUintString } from './randomUintString';

describe('randomUintString', () => {
  it('randomUintString', () => {
    for (let i = 0; i < 100; i++) {
      const str = randomUintString();
      expect(str.length === 16).toBeTruthy();
      expect(/^[1-9][0-9]{15}$/.test(str)).toBeTruthy();
    }
  });
});
