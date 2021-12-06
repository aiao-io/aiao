import { getTag, toInteger } from './lodash';

describe('getTag', () => {
  it('object', () => {
    const obj = new Object();
    expect(getTag(obj)).toEqual('[object Object]');
  });
  it('Number', () => {
    const obj = Number(123);
    expect(getTag(obj)).toEqual('[object Number]');
  });
  it('Number', () => {
    const obj = 123;
    expect(getTag(obj)).toEqual('[object Number]');
  });
  it('String', () => {
    const obj = 'str';
    expect(getTag(obj)).toEqual('[object String]');
  });
  it('Date', () => {
    const obj = new Date();
    expect(getTag(obj)).toEqual('[object Date]');
  });
  it('null', () => {
    expect(getTag(null)).toEqual('[object Null]');
  });
  it('undefined', () => {
    expect(getTag(undefined)).toEqual('[object Undefined]');
  });

  describe('toInteger', () => {
    it('NaN', () => {
      expect(toInteger(undefined)).toEqual(NaN);
      expect(toInteger(null)).toEqual(NaN);
      expect(toInteger(true)).toEqual(NaN);
      expect(toInteger(false)).toEqual(NaN);
      expect(toInteger(void 0)).toEqual(NaN);
      expect(toInteger(NaN)).toEqual(NaN);
    });
    it('string to number', () => {
      expect(toInteger('1')).toEqual(1);
      expect(toInteger('01')).toEqual(1);
      expect(toInteger('001')).toEqual(1);
      expect(toInteger('0001')).toEqual(1);
      expect(toInteger('00001')).toEqual(1);
    });
    it('-string to number', () => {
      expect(toInteger('-1')).toEqual(-1);
      expect(toInteger('-01')).toEqual(-1);
      expect(toInteger('-001')).toEqual(-1);
      expect(toInteger('-0001')).toEqual(-1);
      expect(toInteger('-00001')).toEqual(-1);
    });
    it('string to number', () => {
      expect(toInteger('1')).toEqual(1);
      expect(toInteger('0.1')).toEqual(0);
      expect(toInteger('0.01')).toEqual(0);
      expect(toInteger('0.001')).toEqual(0);
      expect(toInteger('0.0001')).toEqual(0);
    });
  });
});
