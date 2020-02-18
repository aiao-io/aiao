import { addWeeks } from './addWeeks';

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
