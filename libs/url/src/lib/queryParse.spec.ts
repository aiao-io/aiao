import { queryParse } from './queryParse';

describe('queryParse', () => {
  it('ok', () => {
    const query = queryParse('a=2&a=1&c=2&d=foo');
    expect(query).toEqual({ a: ['2', '1'], c: '2', d: 'foo' });
  });
});
