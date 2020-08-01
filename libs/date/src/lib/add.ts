import { addDays } from './addDays';
import { addMilliseconds } from './addMilliseconds';
import { addMonths } from './addMonths';

interface IAddDate {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

// 添加时间
export const add = (date: Date, values: IAddDate) => {
  let { years, months, weeks, days, hours, minutes, seconds } = values;
  years = years || 0;
  months = months || 0;
  weeks = weeks || 0;
  days = days || 0;
  hours = hours || 0;
  minutes = minutes || 0;
  seconds = seconds || 0;
  let newDate = addMonths(date, months + years * 12);
  newDate = addDays(newDate, days + weeks * 7);
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1000;
  newDate = addMilliseconds(newDate, msToAdd);
  return newDate;
};
