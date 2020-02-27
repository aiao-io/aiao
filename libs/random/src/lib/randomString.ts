import { randomInt } from './randomInt';

// number
export const ZERO = '0';
export const NUMBER_WITHOUT_ZERO = '123456789';
export const NUMBERS = ZERO + NUMBER_WITHOUT_ZERO;
// letters
export const LOWER_KETTERS = 'abcdefghijklmnopqrstuvwxyz';
export const UPPER_KETTERS = LOWER_KETTERS.toUpperCase();
export const LETTERS = LOWER_KETTERS + UPPER_KETTERS;
// url
export const SAFE_URL = '_~';
export const URL_ALL = NUMBERS + LETTERS + SAFE_URL;

export const randomString = (size: number = 16, alphabet: string = URL_ALL) => {
  let backStr = '';
  const max = alphabet.length - 1;
  while (size--) backStr += alphabet.charAt(randomInt(0, max));
  return backStr;
};
