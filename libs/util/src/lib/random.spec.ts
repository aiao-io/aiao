import isInteger from 'lodash/isInteger';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import {
  randomArrayItem,
  randomFloat,
  randomInt,
  randomIntByLength,
  randomNumberString,
  randomObjectKey,
  randomObjectValue,
  randomString
} from './random';

describe('NodeLibModule', () => {
  it('randomInt', () => {
    for (let i = 0; i < 100; i++) {
      const number = randomInt(1, 2);
      expect(number).toBeLessThanOrEqual(2);
      expect(number).toBeGreaterThanOrEqual(1);
    }
  });

  it('randomInt', () => {
    const number = randomInt();
    expect(typeof number).toEqual('number');
  });

  it('randomFloat', () => {
    const number = randomFloat();
    expect(typeof number).toEqual('number');
  });

  it('randomFloat', () => {
    for (let i = 0; i < 100; i++) {
      const number = randomFloat(1, 2);
      expect(isInteger(number)).toBeFalsy();
      expect(isNumber(number)).toBeTruthy();
    }
  });

  it('randomArrayItem', () => {
    const arr = [{ a: 1 }, '2', 3, null];
    for (let i = 0; i < 100; i++) {
      const item = randomArrayItem(arr);
      expect(arr.includes(item)).toBeTruthy();
    }
  });

  it('randomObjectKey', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    };
    for (let i = 0; i < 100; i++) {
      const key = randomObjectKey(obj);
      expect(Object.keys(obj).includes(key)).toBeTruthy();
    }
  });

  it('randomObjectValue', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    };
    for (let i = 0; i < 100; i++) {
      const val = randomObjectValue(obj);
      expect(Object.values(obj).includes(val)).toBeTruthy();
    }
  });

  it('randomString', () => {
    for (let i = 0; i < 100; i++) {
      const str = randomString(16);
      expect(str.length === 16).toBeTruthy();
      expect(isString(str)).toBeTruthy();
    }
  });

  it('randomString', () => {
    for (let i = 0; i < 100; i++) {
      const str = randomString();
      expect(str.length === 16).toBeTruthy();
      expect(isString(str)).toBeTruthy();
    }
  });

  it('randomNumberString', () => {
    for (let i = 0; i < 100; i++) {
      const str = randomNumberString();
      expect(str.length === 16).toBeTruthy();
      expect(/^[0-9]+$/.test(str)).toBeTruthy();
    }
  });

  it('randomIntByLength', () => {
    for (let i = 0; i < 100; i++) {
      const str = randomIntByLength();
      expect(isNumber(str)).toBeTruthy();
    }
  });

  it('randomIntByLength', () => {
    for (let i = 0; i < 100; i++) {
      const number = randomIntByLength(2);
      expect(number >= 10).toBeTruthy();
      expect(isNumber(number)).toBeTruthy();
    }
  });
});
