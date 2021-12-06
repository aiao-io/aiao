import { isISODateString } from '../index';

describe('isISODateString', () => {
  it('must string', () => {
    expect(isISODateString(12)).toBeFalsy();
    expect(isISODateString(new Date())).toBeFalsy();
  });

  it('date stirng', () => {
    expect(isISODateString('2020-31-01T01:01:01-10:00')).toBeFalsy();
    expect(isISODateString('2020-01-41T01:01:01-10:00')).toBeFalsy();
    expect(isISODateString('2020-01-01T31:01:01-10:00')).toBeFalsy();
    expect(isISODateString('2020-01-01T01:71:01-10:00')).toBeFalsy();
    expect(isISODateString('2020-01-01T01:01:61-10:00')).toBeFalsy();

    expect(isISODateString('2020-01-01T01:01:01-30:00')).toBeFalsy();
    expect(isISODateString('2020-01-01T01:01:01-10:90')).toBeFalsy();

    expect(isISODateString('2020-01-01T01:01:01-10:00')).toBeTruthy();
    expect(isISODateString('2020-01-01T01:01:01.234-10:00')).toBeTruthy();
    expect(isISODateString('2020-01-01T01:01:01+09:00')).toBeTruthy();

    expect(isISODateString('2020-31-01T01:01:01Z')).toBeFalsy();
    expect(isISODateString('2020-01-41T01:01:01Z')).toBeFalsy();
    expect(isISODateString('2020-01-01T31:01:01Z')).toBeFalsy();
    expect(isISODateString('2020-01-01T01:71:01Z')).toBeFalsy();
    expect(isISODateString('2020-01-01T01:01:61Z')).toBeFalsy();
    expect(isISODateString('2020-01-01T01:01:01z')).toBeFalsy();

    expect(isISODateString('2020-01-01T01:01:01Z')).toBeTruthy();
    expect(isISODateString('2020-01-01T01:01:01.234Z')).toBeTruthy();
  });
});
