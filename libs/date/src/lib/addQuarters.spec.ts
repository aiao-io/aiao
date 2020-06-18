import { addQuarters } from './addQuarters';

describe('addQuarters', function () {
  it('adds the given number of quarters', function () {
    const result = addQuarters(new Date(2014, 8, 1), 1);
    expect(result).toEqual(new Date(2014, 11, 1));
  });

  it('converts a fractional number to an integer', function () {
    const result = addQuarters(new Date(2014, 8, 1), 1.9);
    expect(result).toEqual(new Date(2014, 11, 1));
  });

  it('does not mutate the original date', function () {
    const date = new Date(2014, 8, 1);
    addQuarters(date, 4);
    expect(date).toEqual(new Date(2014, 8, 1));
  });

  it('works well if the desired month has fewer days and the provided date is in the last day of a month', function () {
    const date = new Date(2014, 11, 31);
    const result = addQuarters(date, 3);
    expect(result).toEqual(new Date(2015, 8, 30));
  });

  it('handles dates before 100 AD', function () {
    const initialDate = new Date(0);
    initialDate.setFullYear(-1, 10, 30);
    initialDate.setHours(0, 0, 0, 0);
    const expectedResult = new Date(0);
    expectedResult.setFullYear(0, 1, 29);
    expectedResult.setHours(0, 0, 0, 0);
    const result = addQuarters(initialDate, 1);
    expect(result).toEqual(expectedResult);
  });
});
