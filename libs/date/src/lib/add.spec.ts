import {
  addDays,
  addHours,
  addMilliseconds,
  addMinuts,
  addSeconds,
  addMonths,
  addYears,
  addWeeks,
  addQuarters
} from './add';

describe('add', () => {
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

  describe('addMinutes', () => {
    it('adds the given number of minutes', () => {
      const result = addMinuts(new Date(2014, 6, 10, 12, 0), 30);
      expect(result).toEqual(new Date(2014, 6, 10, 12, 30));
    });

    it('add fractional number', () => {
      const result = addMinuts(new Date(2014, 0, 0, 0, 0), 30.5);
      expect(result).toEqual(new Date(2014, 0, 0, 0, 30, 30));
    });

    it('does not mutate the original date', () => {
      const date = new Date(2014, 6, 10, 12, 0);
      addMinuts(date, 25);
      expect(date).toEqual(new Date(2014, 6, 10, 12, 0));
    });

    it('returns `Invalid Date` if the given date is invalid', () => {
      const result: any = addMinuts(new Date(NaN), 30);
      expect(result instanceof Date).toBeTruthy();
      expect(isNaN(result as any)).toBeTruthy();
    });

    it('returns `Invalid Date` if the given amount is NaN', () => {
      const result: any = addMinuts(new Date(2014, 6, 10, 12, 0), NaN);
      expect(result instanceof Date).toBeTruthy();
      expect(isNaN(result as any)).toBeTruthy();
    });
  });

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

  describe('addWeeks', () => {
    it('adds the given number of weeks', () => {
      const result = addWeeks(new Date(2014, 8, 1), 4);
      expect(result).toEqual(new Date(2014, 8, 29));
    });

    it('converts a fractional number to an integer', () => {
      const result = addWeeks(new Date(2014, 8, 1), 0.5);
      expect(result).toEqual(new Date(2014, 8, 4, 12));
    });

    it('does not mutate the original date', () => {
      const date = new Date(2014, 8, 1);
      addWeeks(date, 2);
      expect(date).toEqual(new Date(2014, 8, 1));
    });
  });

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
  describe('addQuarters', function() {
    it('adds the given number of quarters', function() {
      const result = addQuarters(new Date(2014, 8 /* Sep */, 1), 1);
      expect(result).toEqual(new Date(2014, 11 /* Dec */, 1));
    });

    it('converts a fractional number to an integer', function() {
      const result = addQuarters(new Date(2014, 8 /* Sep */, 1), 1.9);
      expect(result).toEqual(new Date(2014, 11 /* Dec */, 1));
    });

    it('does not mutate the original date', function() {
      const date = new Date(2014, 8 /* Sep */, 1);
      addQuarters(date, 4);
      expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
    });

    it('works well if the desired month has fewer days and the provided date is in the last day of a month', function() {
      const date = new Date(2014, 11 /* Dec */, 31);
      const result = addQuarters(date, 3);
      expect(result).toEqual(new Date(2015, 8 /* Sep */, 30));
    });

    it('handles dates before 100 AD', function() {
      const initialDate = new Date(0);
      initialDate.setFullYear(-1, 10 /* Nov */, 30);
      initialDate.setHours(0, 0, 0, 0);
      const expectedResult = new Date(0);
      expectedResult.setFullYear(0, 1 /* Feb */, 29);
      expectedResult.setHours(0, 0, 0, 0);
      const result = addQuarters(initialDate, 1);
      expect(result).toEqual(expectedResult);
    });
  });

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
});
