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
  it('stringSingleline', () => {
    const str = stringSingleline(` hello       world


      `);
    expect(str).toEqual('hello world');
  });
  it('stringSingleline', () => {
    const str = stringSingleline(` hello       world    `);
    expect(str).toEqual('hello world');
  });
});
