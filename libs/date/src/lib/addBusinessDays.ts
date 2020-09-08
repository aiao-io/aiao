import { toInteger } from 'lodash';

import { isWeekend } from './isWeekend';

// 添加工作日
export const addBusinessDays = (date: Date, days: number) => {
  if (isNaN(days)) {
    return new Date(NaN);
  }
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const needDays = toInteger(days);
  const sign = needDays < 0 ? -1 : 1;
  const fullWeeks = toInteger(needDays / 5);
  newDate.setDate(newDate.getDate() + fullWeeks * 7);
  let restDays = Math.abs(needDays % 5);
  while (restDays > 0) {
    newDate.setDate(newDate.getDate() + sign);
    if (!isWeekend(newDate)) restDays -= 1;
  }
  newDate.setHours(hours);
  return newDate;
};
