import { addYears } from './addYears';

describe('addYears', () => {
  it('adds the given number of years', () => {
    const result = addYears(new Date(2014, 8, 1), 5);
    expect(result).toEqual(new Date(2019, 8, 1));
  });
  it('converts a fractional number to an integer', () => {
    const result = addYears(new Date(2014, 0, 1), 0.5);
    expect(result).toEqual(new Date(2014, 6, 1));
  });

  it('does not mutate the original date', () => {
    const date = new Date(2014, 8, 1);
    addYears(date, 12);
    expect(date).toEqual(new Date(2014, 8, 1));
  });

  it('handles the leap years properly', () => {
    const result = addYears(new Date(2016, 1, 29), 1);
    expect(result).toEqual(new Date(2017, 1, 28));
  });

  it('handles dates before 100 AD', () => {
    const initialDate = new Date(0);
    initialDate.setFullYear(0, 1, 29);
    initialDate.setHours(0, 0, 0, 0);
    const expectedResult = new Date(0);
    expectedResult.setFullYear(1, 1, 28);
    expectedResult.setHours(0, 0, 0, 0);
    const result = addYears(initialDate, 1);
    expect(result).toEqual(expectedResult);
  });

  it('returns `Invalid Date` if the given date is invalid', () => {
    const result: any = addYears(new Date(NaN), 5);
    expect(isNaN(result)).toBeTruthy();
  });

  it('returns `Invalid Date` if the given amount is NaN', () => {
    const result: any = addYears(new Date(2014, 8, 1), NaN);
    expect(isNaN(result)).toBeTruthy();
  });
});
