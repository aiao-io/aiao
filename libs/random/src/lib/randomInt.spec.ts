import { randomInt } from './randomInt';

describe('randomInt', () => {
  it('base', () => {
    for (let i = 0; i < 100; i++) {
      const number = randomInt(1, 2);
      expect(number).toBeLessThanOrEqual(2);
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toEqual(Math.floor(number));
    }
  });

  it('typeof number is number', () => {
    const number = randomInt();
    expect(typeof number).toEqual('number');
  });
});
