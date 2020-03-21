import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isPlainObject from 'lodash/isPlainObject';
import set from 'lodash/set';
import setWith from 'lodash/setWith';
import toPlainObject from 'lodash/toPlainObject';

import { PlainObject } from './types';

/**
 * 简单的 object 深度排序
 * @param objData
 */
export const objDeepSort = (objData: PlainObject): PlainObject => {
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

/**
 * 复杂 object 数据变成简单 object
 * @param object
 */
export const toPlainObjectDeep = (object: unknown): PlainObject => {
  if (isArray(object)) {
    return object.map(d => toPlainObjectDeep(d));
  } else if (isDate(object)) {
    return object;
  } else if (isObject(object)) {
    const toJSON = (object as any).toJSON;
    const newObj: any = toJSON && isFunction(toJSON) ? (object as any).toJSON() : toPlainObject(object);
    Object.keys(newObj).forEach(key => (newObj[key] = toPlainObjectDeep(newObj[key])));
    return newObj;
  } else {
    return object;
  }
};

/**
 * object 转化成扁平的 路径对象 object
 * @param object
 * @param prefix
 * @param result
 * @example
 * in { a: { a: [0, 1] } }
 * out { 'a.a[0]': 0, 'a.a[1]': 1 }
 *
 */
export const plainObjectToFlattenPathObject = (object: PlainObject, prefix: string = '', result: PlainObject = {}) => {
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

/**
 * 转换 PathObject 到 plainObject
 * @param value
 */
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
