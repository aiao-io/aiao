import { getDaysInMonth } from './get';
import toInteger from 'lodash/toInteger';
import { isWeekend } from './isWeekend';

export interface IAddDate {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

// 添加毫秒
export const addMilliseconds = (date: Date, milliseconds: number) => {
  const newDate = new Date(date);
  newDate.setMilliseconds(newDate.getMilliseconds() + milliseconds);
  return newDate;
};

// 添加秒
export const addSeconds = (date: Date, seconds: number) => addMilliseconds(date, seconds * 1000);

// 添加分钟
export const addMinuts = (date: Date, minutes: number) => addMilliseconds(date, minutes * 60000);

// 添加小时
export const addHours = (date: Date, hours: number) => addMilliseconds(date, hours * 3600000);

// 添加天
export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  const day = Math.floor(days);
  newDate.setDate(newDate.getDate() + days);
  const hours = (days - day) * 24;
  if (hours) {
    return addHours(newDate, hours);
  }
  return newDate;
};

// 添加周
export const addWeeks = (date: Date, weeks: number) => addDays(date, weeks * 7);

// 添加月
export const addMonths = (date: Date, mouths: number) => {
  const newDate = new Date(date);
  const desiredMonth = newDate.getMonth() + mouths;
  const dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(newDate.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  newDate.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return newDate;
};

// 添加季度
export const addQuarters = (date: Date, quarter: number) => addMonths(date, Math.floor(quarter) * 3);

// 添加年
export const addYears = (date: Date, years: number) => addMonths(date, years * 12);

// 添加工作日
export const addBusinessDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const sign = days < 0 ? -1 : 1;
  const fullWeeks = toInteger(days / 5);
  newDate.setDate(newDate.getDate() + fullWeeks * 7);
  let restDays = Math.abs(days % 5);
  while (restDays > 0) {
    newDate.setDate(newDate.getDate() + sign);
    if (!isWeekend(newDate)) restDays -= 1;
  }
  newDate.setHours(hours);
  return newDate;
};

// 添加时间
export const dateAdd = (date: Date, values: IAddDate) => {
  let { years, months, weeks, days, hours, minutes, seconds } = values;
  years = years in values ? years : 0;
  months = months in values ? months : 0;
  weeks = weeks in values ? weeks : 0;
  days = days in values ? days : 0;
  hours = hours in values ? hours : 0;
  minutes = minutes in values ? minutes : 0;
  seconds = seconds in values ? seconds : 0;
  let newDate = addMonths(date, months + years * 12);
  newDate = addDays(newDate, days + weeks * 7);
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1000;
  newDate = addMilliseconds(newDate, msToAdd);
  return newDate;
};
