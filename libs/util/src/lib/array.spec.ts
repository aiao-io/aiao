import { needArray } from './array';

describe('array', () => {
  it('needArray', () => {
    const arr = needArray(1);
    expect(arr[0]).toEqual(1);
  });

  it('needArray', () => {
    const arr = needArray([1]);
    expect(arr[0]).toEqual(1);
  });

  it('needArray', () => {
    const arr = needArray(null);
    expect(arr.length).toEqual(0);
  });
});
