import { PlainObject } from './types';

// number
const zero = '0';
const numberWithoutZero = '123456789';
const numbers = zero + numberWithoutZero;
// letters
const lowerKetters = 'abcdefghijklmnopqrstuvwxyz';
const upperKetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letters = lowerKetters + upperKetters;
// url
const safeUrl = '_~';
const all = numbers + letters + safeUrl;

export const randomInt = (min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomFloat = (min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER) =>
  Math.random() * (max - min) + min;

export const randomArrayItem = (array: any[]) => array[Math.floor(Math.random() * array.length)];

export const randomObjectKey = (obj: PlainObject) => {
  const keys = Object.keys(obj);
  return keys[Math.floor(Math.random() * keys.length)];
};

export const randomObjectValue = (obj: PlainObject) => obj[randomObjectKey(obj)];

const _randomStr = (size: number, alphabet: string) => {
  let backStr = '';
  const max = alphabet.length - 1;
  while (size--) backStr += alphabet.charAt(randomInt(0, max));
  return backStr;
};

export const randomString = (size: number = 16, alphabet = all): string => _randomStr(size, alphabet);

export const randomNumberString = (size: number = 16): string =>
  _randomStr(1, numberWithoutZero) + _randomStr(size - 1, numbers);

export const randomIntByLength = (size: number = 16): number => parseInt(randomNumberString(size), 10);
