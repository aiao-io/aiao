export const isString = (str: any) => str && typeof str.valueOf() === 'string';

export const isEmpty = (obj: any) =>
  [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

export const isNil = (value: any) => value === null || value === undefined;

export const chunk = (array: any[], size: number) =>
  array.reduce(
    (arr, item, idx) => (idx % size === 0 ? [...arr, [item]] : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]]),
    []
  );

export const difference = (...arrays: any[]) => arrays.reduce((a, b) => a.filter((c: any) => !b.includes(c)));

export const intersection = (...arrays: any[]) => arrays.reduce((a, b) => a.filter((c: any) => b.includes(c)));

export const minItem = (data: any[], prop: string) => data.reduce((a, b) => (a[prop] <= b[prop] ? a : b), {});

export const maxItem = (data: any[], prop: string) => data.reduce((a, b) => (a[prop] >= b[prop] ? a : b), {});

export const isFunction = (func: any) => func && typeof func === 'function';

// export const debounce = (func: () => {}, wait: number, immediate: boolean) => {
//   let timeout: number;
//   return function () {
//     const context = this,
//       args = arguments;
//     clearTimeout(timeout);
//     timeout = setTimeout(function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     }, wait);
//     if (immediate && !timeout) func.apply(context, args);
//   };
// };

// const has = function (obj, key) {
//   var keyParts = key.split('.');

//   return (
//     !!obj &&
//     (keyParts.length > 1 ? has(obj[key.split('.')[0]], keyParts.slice(1).join('.')) : hasOwnProperty.call(obj, key))
//   );
// };

// const get = (obj, path, defaultValue = undefined) => {
//   const travel = regexp =>
//     String.prototype.split
//       .call(path, regexp)
//       .filter(Boolean)
//       .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
//   const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
//   return result === undefined || result === obj ? defaultValue : result;
// };

// function pick(object, keys) {
//   return keys.reduce((obj, key) => {
//     if (object && object.hasOwnProperty(key)) {
//       obj[key] = object[key];
//     }
//     return obj;
//   }, {});
// }

// function pickBy(object) {
//   const obj = {};
//   for (const key in object) {
//       if (object[key]) {
//           obj[key] = object[key];
//       }
//   }
//   return obj;
// }
