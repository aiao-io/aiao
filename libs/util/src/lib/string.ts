import { get } from './object';
import { PlainObject } from './types';

export const isString = (value: any): value is string => value && typeof value.valueOf() === 'string';

/**
 * 单行文本
 */
export const stringSingleline = (value: string) => value.trim().replace(/\s+/g, ' ');

/**
 * 模板字符串
 */
export const stringTemplate = (template: string, data: PlainObject): string =>
  template.replace(/\${([^}]+)}/g, (_, key: string) => get(data, key.trim(), ''));
