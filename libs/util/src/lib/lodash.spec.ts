import { getTag } from './lodash';

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
});
