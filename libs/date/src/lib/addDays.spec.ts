import { addDays } from './addDays';

describe('addDays', () => {
  it('adds the given number of days', () => {
    const result = addDays(new Date(2014, 8, 1), 10);
    expect(result).toEqual(new Date(2014, 8, 11));
  });

  it('converts a fractional number to an integer', () => {
    const result = addDays(new Date(2014, 8, 1), 0.5);
    expect(result).toEqual(new Date(2014, 8, 1, 12));
  });

  it('does not mutate the original date', () => {
    const date = new Date(2014, 8, 1);
    addDays(date, 11);
    expect(date).toEqual(new Date(2014, 8, 1));
  });

  it('returns `Invalid Date` if the given date is invalid', () => {
    const result = addDays(new Date(NaN), 10);
    expect(isNaN(result as any)).toBeTruthy();
  });

  it('returns `Invalid Date` if the given amount is NaN', () => {
    const result = addDays(new Date(2014, 8, 1), NaN);
    expect(isNaN(result as any)).toBeTruthy();
  });
});
