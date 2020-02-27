import dayJs, { ConfigType, OpUnitType } from 'dayjs';

import isDate from 'lodash/isDate';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

export const unixTimestamp = () => Math.floor(Date.now() / 1000);

export const isISODateString = (value: unknown): boolean =>
  isString(value) &&
  /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|\+[0-2]\d(?:\:[0-5]\d)?)?/g.test(value);

interface ParseTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

type ParseTimeConfig = { [K in keyof ParseTime]: string };
type fotmatPassFunction = (input: { key: keyof ParseTime; value: number }) => string;
type FormatCountdownFunction = (input: ParseTime) => string;

export const parseTime = (startDate: Date, endDate: Date): ParseTime => {
  const ms = endDate.getTime() - startDate.getTime();
  const day = Math.floor(ms / 86400000); // 天
  const month = Math.floor(day / 30); // 月
  const year = Math.floor(month / 12); // 年
  const hour = Math.floor(ms / 3600000) % 24; // 小时
  const minute = Math.floor(ms / 60000) % 60; // 分钟
  const second = Math.floor(ms / 1000) % 60; // 秒
  return { year, month, day, hour, minute, second };
};

const dateKeys: (keyof ParseTime)[] = ['year', 'month', 'day', 'hour', 'minute', 'second'];

const stringTime = (key: keyof ParseTime, value: number, config?: ParseTimeConfig) =>
  config ? `${value} ${(config as ParseTimeConfig)[key] || key}` : `${value} ${key}`;

// 过去了多少时间
export const formatPassTime = (startDate: Date, endDate: Date, config?: ParseTimeConfig | fotmatPassFunction) => {
  const passTime = parseTime(startDate, endDate);
  const key = dateKeys.find(k => passTime[k] > 0);
  const value = passTime[key];
  return isFunction(config) ? config({ key, value }) : stringTime(key, value, config as ParseTimeConfig);
};

// 倒计时
export const formatCountdown = (startDate: Date, endDate: Date, config?: ParseTimeConfig | FormatCountdownFunction) => {
  const passTime = parseTime(startDate, endDate);
  return isFunction(config)
    ? config(passTime)
    : dateKeys
        .filter(d => d)
        .map(key => stringTime(key, passTime[key], config as ParseTimeConfig))
        .join(' ');
};

/**
 *  UTC 时间转换, 不同时区显示指定时区时间
 *  offset 分钟
 */
export const dayUTCFormat = (data: ConfigType, offset: number, format?: string): string => {
  const d: any = dayJs(data);
  return dayJs(d.valueOf() + (offset - d.utcOffset()) * 60 * 1000).format(format);
};

const offsetFn = (offset: number) => {
  const flag = offset > 0 ? '+' : '-';
  const absOffset = Math.abs(offset);
  const hour = `${Math.floor(absOffset / 60)}`.padStart(2, '0');
  const minute = `${absOffset % 60}`.padStart(2, '0');
  return {
    flag,
    absOffset,
    hour,
    minute
  };
};

/**
 *  UTC 时间转换
 *  offset 本地时间 减去 格林威治标准时间 (GMT) 的分钟量 与 getTimezoneOffset 相反数
 *  date 2018-12-04
 *  time 19:09:10
 */
export const dateStringWithTimezone = (date: string, time: string, offset: number) => {
  const { flag, hour, minute } = offsetFn(offset);
  return `${date}T${time}${flag}${hour}:${minute}`;
};

/**
 *  UTC 时间转换
 *  offset 分钟
 *  date 2018-12-04
 *  time 19:09:10
 */
export const dateStringToDate = (date: string, time: string, offset: number) =>
  new Date(dateStringWithTimezone(date, time, offset));

/**
 * 安全添加时间
 */
export const safeAddDate = (start: ConfigType, value: number, unit: OpUnitType, end?: ConfigType): Date => {
  const _dateStart = dayJs(start);
  if (end) {
    const _dateEnd = dayJs(end);
    const ex = _dateEnd.diff(_dateStart, unit);
    if (ex <= value) {
      return _dateEnd.toDate();
    }
  }
  return _dateStart.add(value, unit).toDate();
};

/**
 * 判断是否可以转换成日期
 */
export const canBeDate = (date?: unknown) => {
  if (isNumber(date) || isDate(date)) {
    return true;
  }
  if (isNil(date)) {
    return false;
  }
  if (isString(date)) {
    return dayJs(date).isValid();
  }
  return false;
};

/**
 * 转换字符串日期
 */
export const toDate = (date: ConfigType): Date => dayJs(date).toDate();
