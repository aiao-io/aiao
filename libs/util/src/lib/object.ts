import { set, setWith } from 'lodash';

import { isArray } from './array';
import { isDate } from './date';
import { isFunction } from './function';
import { getTag, isObjectLike } from './lodash';
import { PlainObject } from './types';

export const isObject = (value: any): value is object => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

export const isPlainObject = (value: any) => {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};

export const toPlainObject = (value: any) => {
  value = Object(value);
  const result: any = {};
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = value[key];
    }
  }
  return result;
};

/**
 * 简单的 object 深度排序
 * @param objData
 */
export const objDeepSort = (objData: PlainObject): PlainObject => {
  if (isArray(objData)) {
    return objData.map(objDeepSort);
  } else if (isDate(objData)) {
    return objData;
  } else if (isObject(objData)) {
    const backObject: PlainObject = {};
    Object.keys(objData)
      .sort()
      .forEach(key => {
        backObject[key] = objDeepSort((objData as any)[key]);
      });
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
    return object as any;
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

const has = (obj: any, key: string): boolean => {
  const keyParts = key.split('.');
  return (
    !!obj &&
    (keyParts.length > 1
      ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.'))
      : Object.hasOwnProperty.call(obj, key))
  );
};

export const get = (obj: any, path: string, defaultValue?: string) => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export const pick = (object: any, keys: string[]) => {
  return keys.reduce((obj: any, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};
