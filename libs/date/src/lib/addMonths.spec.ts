import { addMonths } from './addMonths';

describe('addMonths', () => {
  it('adds the given number of months', () => {
    const result = addMonths(new Date(2014, 8, 1), 5);
    expect(result).toEqual(new Date(2015, 1, 1));
  });

  it('converts a fractional number to an integer', () => {
    const result = addMonths(new Date(2014, 8, 1), 5.75);
    expect(result).toEqual(new Date(2015, 1, 1));
  });

  it('does not mutate the original date', () => {
    const date = new Date(2014, 8, 1);
    addMonths(date, 12);
    expect(date).toEqual(new Date(2014, 8, 1));
  });

  it('works well if the desired month has fewer days and the provided date is in the last day of a month', () => {
    const date = new Date(2014, 11, 31);
    const result = addMonths(date, 2);
    expect(result).toEqual(new Date(2015, 1, 28));
  });

  it('handles dates before 100 AD', () => {
    const initialDate = new Date(0);
    initialDate.setFullYear(0, 0, 31);
    initialDate.setHours(0, 0, 0, 0);
    const expectedResult = new Date(0);
    expectedResult.setFullYear(0, 1, 29);
    expectedResult.setHours(0, 0, 0, 0);
    const result = addMonths(initialDate, 1);
    expect(result).toEqual(expectedResult);
  });

  it('returns `Invalid Date` if the given date is invalid', () => {
    const result: any = addMonths(new Date(NaN), 5);
    expect(isNaN(result)).toBeTruthy();
  });

  it('returns `Invalid Date` if the given amount is NaN', () => {
    const result: any = addMonths(new Date(2014, 8, 1), NaN);
    expect(isNaN(result)).toBeTruthy();
  });
});
