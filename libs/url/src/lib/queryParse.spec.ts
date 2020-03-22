import { queryParse } from './queryParse';

describe('queryParse', () => {
  it('ok', () => {
    const query = queryParse('a=2&a=1&c=2&d=foo');
    expect(query).toEqual({ a: ['2', '1'], c: '2', d: 'foo' });
  });
  it('ok', () => {
    const query = queryParse('a=1&a=2&a=3&c=2&d=foo');
    expect(query).toEqual({ a: ['1', '2', '3'], c: '2', d: 'foo' });
  });
});
