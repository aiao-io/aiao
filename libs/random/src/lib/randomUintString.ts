import { NUMBER_WITHOUT_ZERO, NUMBERS, randomString } from './randomString';

// 随机由数字组成的字符串
export const randomUintString = (length: number = 16): string =>
  randomString(1, NUMBER_WITHOUT_ZERO) + randomString(length - 1, NUMBERS);
