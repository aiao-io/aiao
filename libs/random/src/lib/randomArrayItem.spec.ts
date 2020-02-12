import { randomArrayItem } from './randomArrayItem';

describe('randomArrayItem', () => {
  it('randomArrayItem', () => {
    const arr = [{ a: 1 }, '2', 3, null];
    for (let i = 0; i < 100; i++) {
      const item = randomArrayItem(arr);
      expect(arr.includes(item)).toBeTruthy();
    }
  });
});
