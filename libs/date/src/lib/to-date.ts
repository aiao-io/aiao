import isDate from 'lodash/isDate';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

/**
 * 转换字符串日期
 */
export const toDate = (date: string | number | Date): Date => {
  if (isNumber(date)) {
    return new Date(date);
  }
  if (isDate(date)) {
    return date;
  }
  if (isString(date)) {
    return new Date(date);
  }
  throw new Error(`${date} can't be Date`);
};
