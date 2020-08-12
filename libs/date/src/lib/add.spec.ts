import { add } from './add';

describe('add', function () {
  it('adds the values from the given object', function () {
    const result = add(new Date(2014, 8, 1, 10, 19, 50), {
      years: 2,
      months: 9,
      weeks: 1,
      days: 7,
      hours: 5,
      minutes: 9,
      seconds: 30
    });
    expect(result).toEqual(new Date(2017, 5, 15, 15, 29, 20));
  });

  it('add fractional number', function () {
    const result = add(new Date(2014, 8, 1, 0), { hours: 4.5 });
    expect(result).toEqual(new Date(2014, 8, 1, 4, 30));
  });

  it('implicitly converts number arguments', function () {
    // $ExpectedMistake
    const result = add(new Date(2014, 8, 1, 0), { hours: '4.5' } as any);
    expect(result).toEqual(new Date(2014, 8, 1, 4, 30));
  });

  it('does not mutate the original date', function () {
    const date = new Date(2014, 8, 1, 10);
    add(date, { hours: 4 });
    expect(date).toEqual(new Date(2014, 8, 1, 10));
  });

  it('works well if the desired month has fewer days and the provided date is in the last day of a month', function () {
    const date = new Date(2014, 11 /* Dec */, 31);
    const result = add(date, { months: 9 });
    expect(result).toEqual(new Date(2015, 8, 30));
  });

  it('handles dates before 100 AD', function () {
    const initialDate = new Date(0);
    initialDate.setFullYear(-1, 10 /* Nov */, 30);
    initialDate.setHours(0, 0, 0, 0);
    const expectedResult = new Date(0);
    expectedResult.setFullYear(0, 1 /* Feb */, 29);
    expectedResult.setHours(0, 0, 0, 0);
    const result = add(initialDate, { months: 3 });
    expect(result).toEqual(expectedResult);
  });

  it('returns `Invalid Date` if the given date is invalid', function () {
    const result = add(new Date(NaN), { hours: 5 });
    expect(isNaN(result as any)).toBeTruthy();
  });
});
