import { isNumber, isString } from '@aiao/util';

const regPrefix = /^([^/:]+):\/*/;

export const urlJoin = (...paths: Array<string | number>) => {
  paths = paths.filter(d => d !== '');
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

  let pathStr = paths
    .map(path =>
      `${path}`
        .replace(/^\/+/, '')
        .replace(/^\.\/+/, '')
        .replace(/\/+$/, '')
    )
    .filter(d => d !== '')
    .join('/');

  while (pathStr.includes('/../')) {
    const pathArr = pathStr.split('/');
    const index = pathArr.findIndex(d => d === '..');
    pathArr.splice(index - 1, 2);
    pathStr = pathArr.join('/');
  }

  let backStr = prefix + pathStr;
  if (backStr.includes('?')) {
    const parts = backStr.split('?').filter(d => d !== '');
    backStr = parts.shift() + '?';
    if (parts.length > 0) {
      backStr += parts.join('&');
    }
  }

  return backStr.replace(/\/(\?|&|#[^!])/g, '$1');
};
