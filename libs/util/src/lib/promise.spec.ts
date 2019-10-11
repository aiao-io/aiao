import { sleep } from './promise';

describe('promise', () => {
  it('sleep', async () => {
    const t = Date.now();
    await sleep(1000);
    const now = Date.now() - t;
    expect(now).toBeGreaterThanOrEqual(1000);
    expect(now).toBeLessThanOrEqual(1100);
  });
});
