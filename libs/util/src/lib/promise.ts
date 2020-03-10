/**
 * 等待时间
 * @param ms 毫秒
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
