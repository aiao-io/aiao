import isString from 'lodash/isString';

/**
 * 正常化 monaco 输入值，支持 json object
 * @param language 语言
 * @param value 值
 */
export const normalizeMonacoEditorValue = (language: string, value: any) => {
  let backVal = value;
  switch (language) {
    case 'json':
      try {
        backVal = JSON.stringify(value, null, 2);
      } catch {
        //
      }
      break;

    default:
      break;
  }
  return backVal;
};

/**
 * 正常化 monaco 输出值，支持 json object，直接导出
 * @param language 语言
 * @param value 值
 */
export const normalizeMonacoEditorValueOut = (language: string, value: any) => {
  return language === 'json' && value && isString(value) ? JSON.parse(value) : value;
};
