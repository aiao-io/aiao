import { addMilliseconds } from './addMilliseconds';

describe('addMilliseconds', () => {
  it('adds the given number of milliseconds', () => {
    const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750);
    expect(result).toEqual(new Date(2014, 6, 10, 12, 45, 30, 750));
  });

  it('converts a fractional number to an integer', () => {
    const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750.75);
    expect(result).toEqual(new Date(2014, 6, 10, 12, 45, 30, 750));
  });

  it('does not mutate the original date', () => {
    const date = new Date(2014, 6, 10, 12, 45, 30, 0);
    addMilliseconds(date, 250);
    expect(date).toEqual(new Date(2014, 6, 10, 12, 45, 30, 0));
  });

  it('returns `Invalid Date` if the given date is invalid', () => {
    const result = addMilliseconds(new Date(NaN), 750);
    expect(isNaN(result as any)).toBeTruthy();
  });

  it('returns `Invalid Date` if the given amount is NaN', () => {
    const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), NaN);
    expect(isNaN(result as any)).toBeTruthy();
  });
});
