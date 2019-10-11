import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';

/**
 * 转化数组
 */
export const needArray = <T = any>(value: any): T[] => {
  if (isArray(value)) {
    return value;
  }

  if (isNil(value)) {
    return [];
  }
  return [value];
};
