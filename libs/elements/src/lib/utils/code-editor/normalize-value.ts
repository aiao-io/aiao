import { isString } from '@aiao/util';

/**
 * 正常化 monaco 输入值，支持 json object
 * @param language 语言
 * @param value 值
 */
export const normalizeMonacoEditorValue = (value: any, language?: string) => {
  switch (language) {
    case 'json':
      try {
        value = JSON.stringify(value, null, 2);
      } catch {
        //
      }
      break;
    default:
      break;
  }
  return value;
};

/**
 * 正常化 monaco 输出值，支持 json object，直接导出
 * @param language 语言
 * @param value 值
 */
export const normalizeMonacoEditorValueOut = (value: any, language?: string) => {
  return language === 'json' && value && isString(value) ? JSON.parse(value) : value;
};
