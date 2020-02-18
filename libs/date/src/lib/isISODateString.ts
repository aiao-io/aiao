import isString from 'lodash/isString';

export const isISODateString = (value: unknown): boolean =>
  isString(value) &&
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|\+[0-2]\d(?:\:[0-5]\d)?)?/g.test(value);
