import { addSeconds } from './addSeconds';

describe('addSeconds', () => {
  it('adds the given number of seconds', () => {
    const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30);
    expect(result).toEqual(new Date(2014, 6, 10, 12, 45, 30));
  });

  it('add fractional number ', () => {
    const result = addSeconds(new Date(2014, 0, 0, 0, 0, 0), 30.5);
    expect(result).toEqual(new Date(2014, 0, 0, 0, 0, 30, 500));
  });

  it('does not mutate the original date', () => {
    const date = new Date(2014, 6, 10, 12, 45, 0);
    addSeconds(date, 15);
    expect(date).toEqual(new Date(2014, 6, 10, 12, 45, 0));
  });

  it('returns `Invalid Date` if the given date is invalid', () => {
    const result = addSeconds(new Date(NaN), 30);
    expect(isNaN(result as any)).toBeTruthy();
  });

  it('returns `Invalid Date` if the given amount is NaN', () => {
    const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), NaN);
    expect(isNaN(result as any)).toBeTruthy();
  });
});
