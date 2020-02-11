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
 *  添加时区
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
