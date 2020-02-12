import { addHours } from './addHours';

describe('addHours', () => {
  it('adds the given numbers of hours', () => {
    const result = addHours(new Date(2014, 6, 10, 23, 0), 2);
    expect(result).toEqual(new Date(2014, 6, 11, 1, 0));
  });

  it('add fractional number', () => {
    const result = addHours(new Date(2014, 0, 0, 0, 0), 2.5);
    expect(result).toEqual(new Date(2014, 0, 0, 2, 30));
  });

  it('does not mutate the original date', () => {
    const date = new Date(2014, 6, 10, 23, 0);
    addHours(date, 10);
    expect(date).toEqual(new Date(2014, 6, 10, 23, 0));
  });

  it('returns `Invalid Date` if the given date is invalid', () => {
    const result: any = addHours(new Date(NaN), 2);
    expect(result instanceof Date).toBeTruthy();
    expect(isNaN(result as any)).toBeTruthy();
  });

  it('returns `Invalid Date` if the given amount is NaN', () => {
    const result: any = addHours(new Date(2014, 6, 10, 23, 0), NaN);
    expect(result instanceof Date).toBeTruthy();
    expect(isNaN(result as any)).toBeTruthy();
  });
});
