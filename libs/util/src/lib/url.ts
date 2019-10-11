import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

const regPrefix = /^([^/:]+):\/*/;

export const urlJoin = (...paths: Array<string | number>) => {
  if (paths.length === 0) {
    return '';
  }

  const findIndex = paths.findIndex(d => !(isString(d) || isNumber(d)));
  if (findIndex >= 0) {
    throw new Error('paths must be a string or number');
  }

  let prefix = '';
  const firstPath = `${paths[0]}`;

  if (firstPath.startsWith('//')) {
    prefix = '//';
  } else if (firstPath.startsWith('/')) {
    prefix = '/';
  } else {
    if (firstPath.startsWith('file:') && paths.length > 1 && (firstPath + paths[1]).match(/^file:\/\/\//)) {
      prefix = firstPath.replace(regPrefix, '$1:///');
    } else {
      prefix = firstPath.replace(regPrefix, '$1://');
    }
    paths.shift();
  }

  if (prefix && !prefix.endsWith('/')) {
    prefix += '/';
  }

  let backStr =
    prefix +
    paths
      .map(path => `${path}`.replace(/^\/+/, '').replace(/\/+$/, ''))
      .filter(d => d !== '')
      .join('/');

  if (backStr.includes('?')) {
    const parts = backStr.split('?').filter(d => d !== '');
    backStr = parts.shift() + '?';
    if (parts.length > 0) {
      backStr += parts.join('&');
    }
  }

  return backStr.replace(/\/(\?|&|#[^!])/g, '$1');
};
