import isString from 'lodash/isString';

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

export const normalizeMonacoEditorValueOut = (language: string, value: any) => {
  return language === 'json' && value && isString(value) ? JSON.parse(value) : value;
};
