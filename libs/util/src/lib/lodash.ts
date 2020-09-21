export const isNil = (value: any) => value === null || value === undefined;

export const getTag = (value: any) => {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
};
export const isObjectLike = (value: any) => typeof value === 'object' && value !== null;
