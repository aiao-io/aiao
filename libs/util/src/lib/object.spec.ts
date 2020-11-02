import {
  flattenPathObjectTOplainObject,
  get,
  has,
  isPlainObject,
  objDeepSort,
  pick,
  plainObjectToFlattenPathObject,
  toPlainObject,
  toPlainObjectDeep
} from './object';

describe('object', () => {
  it('objDeepSort', () => {
    expect(Object.keys(objDeepSort({ b: 2, a: 1, c: [1, 2, 3] }))).toEqual(['a', 'b', 'c']);
    const deep = objDeepSort({ b: 2, c: { b: 1, a: 2 }, a: 1 });
    expect(Object.keys(deep['c'])).toEqual(['a', 'b']);
    expect(Object.keys(deep)).toEqual(['a', 'b', 'c']);
    expect(objDeepSort([3, 2, 1])).toEqual([3, 2, 1]);
    const a = new Date();
    expect(objDeepSort(a)).toEqual(a);
  });

  it('toPlainObjectDeep', () => {
    class Bar {
      toJSON() {
        return { c: 2, a: 1 };
      }
    }

    expect(toPlainObjectDeep([1, 2, { b: new Bar(), a: new Date(1) }])).toEqual([
      1,
      2,
      { b: { a: 1, c: 2 }, a: new Date(1) }
    ]);
  });

  it('toPlainObject', () => {
    class Foo {
      c = 3;
      b: any;
      constructor() {
        this.b = 2;
      }
    }

    const actual = Object.assign({ a: 1 }, toPlainObject(new Foo()));

    expect(actual).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('plainObjectToFlattenPathObject', () => {
    expect(plainObjectToFlattenPathObject({ a: { a: 1 } })).toEqual({ 'a.a': 1 });
    expect(plainObjectToFlattenPathObject({ a: { a: [0, 1] } })).toEqual({ 'a.a[0]': 0, 'a.a[1]': 1 });
    expect(plainObjectToFlattenPathObject({ a: { a: { '0': 0, '1': 1 } } })).toEqual({ 'a.a.0': 0, 'a.a.1': 1 });
    expect(plainObjectToFlattenPathObject({ a: { a: new Date(1) } })).toEqual({ 'a.a': new Date(1) });
  });

  it('flattenPathObjectTOplainObject', () => {
    expect(flattenPathObjectTOplainObject({ 'a.a': 1 })).toEqual({ a: { a: 1 } });
    expect(flattenPathObjectTOplainObject({ 'a.a[0]': 0, 'a.a[1]': 1 })).toEqual({ a: { a: [0, 1] } });
    expect(flattenPathObjectTOplainObject({ 'a.a.0': 0, 'a.a.1': 1 })).toEqual({ a: { a: { '0': 0, '1': 1 } } });
  });

  it('isPlainObject', () => {
    class Foo {
      constructor(private a: any) {}
    }
    expect(isPlainObject({})).toEqual(true);
    expect(isPlainObject({ a: 1 })).toEqual(true);
    expect(isPlainObject({ constructor: Foo })).toEqual(true);
    expect(isPlainObject([1, 2, 3])).toEqual(false);
    expect(isPlainObject(new Foo(1))).toEqual(false);

    expect(isPlainObject(Object.create(null))).toEqual(true);
  });

  it('has', () => {
    expect(has({ a: { b: { c: 1 } } }, 'a.b.c')).toBeTruthy();
  });
  it('get', () => {
    expect(get({ a: { b: { c: 1 } } }, 'a.b.c')).toEqual(1);
    expect(get({ a: { b: { c: 1 } } }, 'a.b.d', 123)).toEqual(123);
    expect(get({ a: [{ b: { c: 1 } }] }, 'a[0].b.c')).toEqual(1);
  });
  it('pick', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a'])).toEqual({ a: 1 });
  });
});
