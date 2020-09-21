import { toInteger } from 'lodash';

import { addHours } from './addHours';

// 添加天
export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  const day = toInteger(days);
  newDate.setDate(newDate.getDate() + days);
  const hours = (days - day) * 24;
  if (hours) {
    return addHours(newDate, hours);
  }
  return newDate;
};
