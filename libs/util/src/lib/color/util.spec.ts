import { formatDecimal } from './util';

describe('color util', () => {
  it('formatDecimal', () => {
    expect(formatDecimal(0.21)).toEqual('21%');
  });
});
