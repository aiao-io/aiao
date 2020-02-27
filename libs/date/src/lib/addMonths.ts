import { getDaysInMonth } from './getDaysInMonth';

// 添加月
export const addMonths = (date: Date, mouths: number) => {
  const newDate = new Date(date);
  const desiredMonth = newDate.getMonth() + mouths;
  const dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(newDate.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  newDate.setMonth(desiredMonth, Math.min(daysInMonth, newDate.getDate()));
  return newDate;
};
