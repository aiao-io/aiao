import { leancloudHash } from './leancloud-hash';

// https://leancloud.cn/docs/dashboard_guide.html#hash-75200518
describe('leancloudHash', () => {
  it('ok', () => {
    const hash = leancloudHash('password', 'h60d8x797d3oa0naxybxxv9bn7xpt2yiowz68mpiwou7gwr2');
    expect(hash.derivedKey).toEqual(
      'tA7BLW+NK0UeARng0693gCaVnljkglCB9snqlpCSUKjx2RgYp8VZZOQt0S5iUtlDrkJXfT3gknS4rRqjYsd/Ug=='
    );
  });
});
