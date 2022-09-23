import { isXML } from './xml';

describe('isXML', () => {
  it('stringTemplate', () => {
    const is = isXML(`
    <a></a>`);
    expect(is).toBeTruthy();
  });
});
