export const isNil = (value: unknown) => value === null || value === undefined;

export const getTag = (value: unknown) => {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
};
export const isObjectLike = (value: unknown) => typeof value === 'object' && value !== null;

export const toInteger = (value: unknown) => {
  if (value === undefined || value === null || value === true || value === false) {
    return NaN;
  }
  const number = Number(value);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
};
