import { chunk, difference, intersection, needArray } from './array';

describe('array', () => {
  describe('needArray', () => {
    it('1', () => {
      const arr = needArray(1);
      expect(arr[0]).toEqual(1);
    });

    it('2', () => {
      const arr = needArray(null);
      expect(arr.length).toEqual(0);
    });

    it('3', () => {
      const arr = needArray([0]);
      expect(arr).toEqual([0]);
    });
  });

  describe('chunk', () => {
    const array = [0, 1, 2, 3, 4, 5];
    it('should return chunked arrays', () => {
      const actual = chunk(array, 3);
      expect(actual).toEqual([
        [0, 1, 2],
        [3, 4, 5]
      ]);
    });
  });

  describe('difference', () => {
    it('should return difference arrays', () => {
      const actual = difference([0, 1, 2], [2, 3, 4]);
      expect(actual).toEqual([0, 1]);
    });
  });
  describe('intersection', () => {
    it('should return intersection arrays', () => {
      const actual = intersection([0, 1, 2], [2, 3, 4]);
      expect(actual).toEqual([2]);
    });
  });
});
