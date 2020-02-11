import { addMilliseconds } from './addMilliseconds';

// 添加秒
export const addSeconds = (date: Date, seconds: number) => addMilliseconds(date, seconds * 1000);
