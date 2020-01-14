import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';

export const normalizeMonacoEditorValue = (language: string, value: any) => {
  return language === 'json' && value && isPlainObject(value) ? JSON.stringify(value, null, 2) : value;
};

export const normalizeMonacoEditorValueOut = (language: string, value: any) => {
  try {
    return language === 'json' && value && isString(value) ? JSON.parse(value) : value;
  } catch {
    return {};
  }
};
