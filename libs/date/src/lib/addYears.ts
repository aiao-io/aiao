import { addMonths } from './addMonths';

// 添加年
export const addYears = (date: Date, years: number) => addMonths(date, years * 12);
