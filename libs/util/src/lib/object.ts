import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isPlainObject from 'lodash/isPlainObject';
import set from 'lodash/set';
import setWith from 'lodash/setWith';
import toPlainObject from 'lodash/toPlainObject';

import { PlainObject } from './types';

export const objDeepSort = (objData: unknown): unknown => {
  if (isArray(objData)) {
    return objData.map(objDeepSort);
  } else if (isObject(objData)) {
    const backObject: any = {};
    Object.keys(objData)
      .sort()
      .forEach(key => (backObject[key] = objDeepSort(objData[key])));
    return backObject;
  }
  return objData;
};

export const toPlainObjectDeep = (obj: any): any => {
  if (isArray(obj)) {
    return obj.map(d => toPlainObjectDeep(d));
  } else if (isDate(obj)) {
    return obj;
  } else if (isObject(obj)) {
    const toJSON = (obj as any).toJSON;
    const newObj: any = toJSON && isFunction(toJSON) ? (obj as any).toJSON() : toPlainObject(obj);
    Object.keys(newObj).forEach(key => (newObj[key] = toPlainObjectDeep(newObj[key])));
    return newObj;
  } else {
    return obj;
  }
};

export const plainObjectToFlattenPathObject = (object: unknown, prefix: string = '', result: PlainObject = {}) => {
  if (isArray(object)) {
    object.forEach((value, index) => {
      plainObjectToFlattenPathObject(value, `${prefix}[${index}]`, result);
    });
  } else if (isPlainObject(object)) {
    Object.keys(object).forEach(key =>
      plainObjectToFlattenPathObject(object[key], `${prefix ? prefix + '.' : ''}${key}`, result)
    );
  } else {
    result[`${prefix}`] = object;
  }

  return result;
};

export const flattenPathObjectTOplainObject = (value: PlainObject) => {
  const back = {};
  Object.keys(value).forEach(path => {
    const match = path.match(/[^\]]*\[\d+\]/);
    if (match) {
      set(back, path, value[path]);
    } else {
      setWith(back, path, value[path], Object);
    }
  });
  return back;
};
