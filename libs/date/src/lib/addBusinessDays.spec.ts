import { addBusinessDays } from './addBusinessDays';

describe('addBusinessDays', function () {
  it('adds the given number of business days', function () {
    const result = addBusinessDays(new Date(2014, 8 /* Sep */, 1), 10);
    expect(result).toEqual(new Date(2014, 8 /* Sep */, 15));
  });

  it('handles negative amount', function () {
    const result = addBusinessDays(new Date(2014, 8 /* Sep */, 15), -10);
    expect(result).toEqual(new Date(2014, 8 /* Sep */, 1));
  });

  it('returns the Monday when 1 day is added on the Friday', () => {
    const result = addBusinessDays(new Date(2020, 0 /* Jan */, 10), 1);
    expect(result).toEqual(
      // Friday
      new Date(2020, 0 /* Jan */, 13) // Monday
    );
  });

  it('returns the Monday when 1 day is added on the Satuday', () => {
    const result = addBusinessDays(new Date(2020, 0 /* Jan */, 11), 1); // Saturday
    expect(result).toEqual(
      new Date(2020, 0 /* Jan */, 13) // Monday
    );
  });

  it('returns the Monday when 1 day is added on the Sunday', () => {
    const result = addBusinessDays(new Date(2020, 0 /* Jan */, 12), 1); // Sunday;
    expect(result).toEqual(
      new Date(2020, 0 /* Jan */, 13) // Monday
    );
  });

  it('can handle a large number of business days', function () {
    const result = addBusinessDays(new Date(2014, 0 /* Jan */, 1), 3387885);
    expect(result).toEqual(new Date(15000, 0 /* Jan */, 1));
  });

  it('converts a fractional number to an integer', function () {
    const result = addBusinessDays(new Date(2014, 8 /* Sep */, 1), 10.5);
    expect(result).toEqual(new Date(2014, 8 /* Sep */, 15));
  });

  it('does not mutate the original date', function () {
    const date = new Date(2014, 8 /* Sep */, 1);
    addBusinessDays(date, 11);
    expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
  });

  it('returns `Invalid Date` if the given date is invalid', function () {
    const result = addBusinessDays(new Date(NaN), 10);
    expect(isNaN(result as any)).toBeTruthy();
  });

  it('returns `Invalid Date` if the given amount is NaN', function () {
    const result = addBusinessDays(new Date(2014, 8 /* Sep */, 1), NaN);
    expect(isNaN(result as any)).toBeTruthy();
  });
});
