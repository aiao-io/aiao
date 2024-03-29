import { sleep } from './promise';

describe('promise', () => {
  it('sleep', async () => {
    const t = Date.now();
    await sleep(100);
    const now = Date.now() - t;
    expect(now).toBeGreaterThanOrEqual(90);
    expect(now).toBeLessThanOrEqual(200);
  });
});
