import {
  objDeepSort,
  toPlainObjectDeep,
  flattenPathObjectTOplainObject,
  plainObjectToFlattenPathObject
} from './object';

describe('object', () => {
  it('objDeepSort', () => {
    expect(Object.keys(objDeepSort({ b: 2, a: 1, c: [1, 2, 3] }))).toEqual(['a', 'b', 'c']);
    const deep = objDeepSort({ b: 2, c: { b: 1, a: 2 }, a: 1 });
    expect(Object.keys(deep['c'])).toEqual(['a', 'b']);
    expect(Object.keys(deep)).toEqual(['a', 'b', 'c']);
    expect(objDeepSort([3, 2, 1])).toEqual([3, 2, 1]);
  });

  it('a', () => {
    function Foo() {
      this.b = 2;
    }
    Foo.prototype.c = 3;
    expect(toPlainObjectDeep(new Foo())).toEqual({ b: 2, c: 3 });
  });

  it('a', () => {
    function Foo() {
      this.b = 2;
    }
    function Bar() {
      this.a = 3;
    }
    Foo.prototype.c = new Bar();
    expect(toPlainObjectDeep(new Foo())).toEqual({ b: 2, c: { a: 3 } });
  });
  it('a', () => {
    class Bar {
      toJSON() {
        return { c: 2, a: 1 };
      }
    }
    expect(toPlainObjectDeep(toPlainObjectDeep([1, 2, { b: new Bar(), a: new Date(1) }]))).toEqual([
      1,
      2,
      { b: { a: 1, c: 2 }, a: new Date(1) }
    ]);
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
});
