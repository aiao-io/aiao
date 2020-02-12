import { addMilliseconds } from './addMilliseconds';

// 添加小时
export const addHours = (date: Date, hours: number) => addMilliseconds(date, hours * 3600000);
