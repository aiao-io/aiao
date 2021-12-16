export const isString = (value: any): value is string => value && typeof value.valueOf() === 'string';
