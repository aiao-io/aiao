import get from 'lodash/get';

import { PlainObject } from './types';

/**
 * 单行文本
 */
export const stringSingleline = (value: string) => value.replace(/^\s*|\f|\n|\r|\t|\v|\s*$/g, '').replace(/\s+/g, ' ');

/**
 * 模板字符串
 */
export const stringTemplate = (template: string, data: PlainObject): string =>
  template.replace(/\${([^}]+)}/g, (_, key: string) => get(data, key.trim(), ''));
