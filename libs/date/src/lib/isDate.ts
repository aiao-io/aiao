export const isDate = (value: any) =>
  value instanceof Date || (typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]');
