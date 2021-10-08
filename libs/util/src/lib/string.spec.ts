import { stringSingleline, stringTemplate } from './string';

describe('string', () => {
  it('stringTemplate', () => {
    const str1 = stringTemplate('name ${ name }', { name: 'aiao' });
    const str2 = stringTemplate('name ${user.name}', { user: { name: 'aiao' } });
    const str3 = stringTemplate('name ${     user.name    }', { user: { name: 'aiao' } });

    expect(str1).toEqual('name aiao');
    expect(str2).toEqual('name aiao');
    expect(str3).toEqual('name aiao');
  });
  it('array', () => {
    const str1 = stringTemplate('name ${ 0.name }', [{ name: 'aiao' }]);
    expect(str1).toEqual('name aiao');
  });
  it('array 2', () => {
    const str1 = stringTemplate('name ${ [0].name }', [{ name: 'aiao' }]);
    expect(str1).toEqual('name aiao');
  });
  it('object array', () => {
    const str1 = stringTemplate('name ${ 0 }', ['aiao']);
    expect(str1).toEqual('name aiao');
  });

  it('stringSingleline1', () => {
    const str = stringSingleline(` hello
          world


      `);
    expect(str).toEqual('hello world');
  });
  it('stringSingleline2', () => {
    const str = stringSingleline(`
     hello
        \n
        \r
        \f
        \n
        \r
        \t
        \v
         world


      `);
    expect(str).toEqual('hello world');
  });
  it('stringSingleline3', () => {
    const str = stringSingleline(` hello       world    `);
    expect(str).toEqual('hello world');
  });
});
