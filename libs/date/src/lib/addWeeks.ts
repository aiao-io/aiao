import { addDays } from './addDays';

// 添加周
export const addWeeks = (date: Date, weeks: number) => addDays(date, weeks * 7);
