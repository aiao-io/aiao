import { addMilliseconds } from './addMilliseconds';

// 添加分钟
export const addMinuts = (date: Date, minutes: number) => addMilliseconds(date, minutes * 60000);
