import { isNil } from './lodash';

export const isArray = (value: any): value is any[] => Array.isArray(value);

/**
 * 转化数组
 */
export const needArray = <T = any>(value: any): T[] => {
  if (Array.isArray(value)) {
    return value;
  }

  if (isNil(value)) {
    return [];
  }
  return [value];
};

export const chunk = (array: any[], size: number) =>
  array.reduce(
    (arr, item, idx) => (idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]),
    []
  );

export const difference = (...arrays: any[]) => arrays.reduce((a, b) => a.filter((c: any) => !b.includes(c)));

export const intersection = (...arrays: any[]) => arrays.reduce((a, b) => a.filter((c: any) => b.includes(c)));
