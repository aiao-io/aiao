import { queryStringify } from './queryStringify';

describe('queryStringify', () => {
  it('ok', () => {
    const query = queryStringify({ a: [2, 1], c: 2, d: 3 });
    expect(query).toEqual('a=2&a=1&c=2&d=3');
  });
});
