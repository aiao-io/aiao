import isFunction from 'lodash/isFunction';

interface ParseTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}
type FormatCountdownFunction = (input: ParseTime) => string;

type ParseTimeConfig = { [K in keyof ParseTime]: string };
type fotmatPassFunction = (input: { key: keyof ParseTime; value: number }) => string;

const dateKeys: (keyof ParseTime)[] = ['year', 'month', 'day', 'hour', 'minute', 'second'];

const stringTime = (key: keyof ParseTime, value: number, config?: ParseTimeConfig) =>
  config ? `${value} ${(config as ParseTimeConfig)[key] || key}` : `${value} ${key}`;

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
