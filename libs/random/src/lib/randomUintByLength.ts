import { randomUintString } from './randomUintString';

export const randomUintByLength = (length: number = 16): number => parseInt(randomUintString(length), 10);
