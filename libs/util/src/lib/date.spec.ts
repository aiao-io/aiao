import {
  canBeDate,
  dateStringToDate,
  dateStringWithTimezone,
  dayUTCFormat,
  formatCountdown,
  formatPassTime,
  isISODateString,
  safeAddDate,
  toDate,
  unixTimestamp
} from './date';

describe('formatPassTime', () => {
  const config = {
    year: '年前',
    month: '个月前',
    day: '天前',
    hour: '小时',
    minute: '分钟前',
    second: '秒前'
  };

  it('formatPassTime', () => {
    const d = formatPassTime(new Date('2015-11-01'), new Date('2018-11-01'), config);
    expect(d).toEqual('3 年前');
  });

  it('formatPassTime', () => {
    const d = formatPassTime(new Date('2015-11-01'), new Date('2018-11-01'));
    expect(d).toEqual('3 year');
  });

  it('formatPassTime', () => {
    const d = formatPassTime(new Date('2015-11-01'), new Date('2016-03-01'), config);
    expect(d).toEqual('4 个月前');
  });

  it('formatPassTime', () => {
    const d = formatPassTime(new Date('2016-11-01'), new Date('2016-11-21'), config);
    expect(d).toEqual('20 天前');
  });

  it('formatPassTime', () => {
    const d = formatPassTime(new Date('2015-11-01 18:12'), new Date('2015-11-01 20:18'), config);
    expect(d).toEqual('2 小时');
  });

  it('formatPassTime', () => {
    const d = formatPassTime(new Date('2015-11-01 20:12'), new Date('2015-11-01 20:18'), config);
    expect(d).toEqual('6 分钟前');
  });

  it('formatPassTime', () => {
    const d = formatPassTime(new Date('2015-11-01 20:18:10'), new Date('2015-11-01 20:18:30'), config);
    expect(d).toEqual('20 秒前');
  });

  it('formatPassTime without config', () => {
    const d = formatPassTime(new Date('2015-11-01 20:18:10'), new Date('2015-11-01 20:18:30'), { s: 'a' } as any);
    expect(d).toEqual('20 second');
  });
  it('formatPassTime 0 second', () => {
    const d = formatPassTime(new Date('2015-11-01 20:18:10'), new Date('2015-11-01 20:18:10'), { s: 'a' } as any);
    expect(d).toEqual('0 second');
  });

  it('formatPassTime', () => {
    const d = formatPassTime(
      new Date('2015-11-01 20:18:10'),
      new Date('2015-11-01 20:18:30'),
      ({ key, value }) => `${value} ${key}`
    );
    expect(d).toEqual('20 second');
  });

  it('formatCountdown', () => {
    const d = formatCountdown(new Date('2015-11-01 10:38:10'), new Date('2015-11-01 20:18:30'));
    expect(d).toEqual('0 year 0 month 0 day 9 hour 40 minute 20 second');
  });

  it('formatCountdown funtion', () => {
    const d = formatCountdown(
      new Date('2015-11-01 10:38:10'),
      new Date('2015-11-01 20:18:30'),
      ({ year, month, day, hour, minute, second }) => `${year} ${month} ${day} ${hour} ${minute} ${second}`
    );
    expect(d).toEqual('0 0 0 9 40 20');
  });

  it('formatCountdown', () => {
    const d = formatCountdown(new Date('2015-11-01 10:38:10'), new Date('2015-11-01 20:18:30'), {
      year: '年',
      month: '月',
      day: '天',
      hour: '小时',
      minute: '分钟',
      second: '秒'
    });
    expect(d).toEqual('0 年 0 月 0 天 9 小时 40 分钟 20 秒');
  });

  it('unixTimestamp', () => {
    const time = unixTimestamp();
    expect(time).toBeGreaterThan(0);
  });

  it('isISODateString', () => {
    expect(isISODateString('2019-09-29T13:50:39.247Z')).toBeTruthy();
  });

  it('dayUTCFormat', () => {
    const date = dayUTCFormat('2019-09-10T00:00:00.000Z', 480, 'YYYY-MM-DD HH:mm');
    expect(date).toEqual('2019-09-10 08:00');
  });

  it('dateStringWithTimezone', () => {
    const date = dateStringWithTimezone('2018-12-04', '19:09:10', 480);
    expect(date).toEqual('2018-12-04T19:09:10+08:00');
    const date2 = dateStringWithTimezone('2018-12-04', '19:09:10', -480);
    expect(date2).toEqual('2018-12-04T19:09:10-08:00');
  });

  it('dateStringToDate', () => {
    const date = dateStringToDate('2018-12-04', '19:09:10', 480);
    expect(date.toISOString()).toEqual('2018-12-04T11:09:10.000Z');
  });

  it('safeAddDate', () => {
    const date = safeAddDate(new Date('2019-09-10T00:00:00.000Z'), 10, 'day');
    expect(date.toISOString()).toEqual('2019-09-20T00:00:00.000Z');
  });

  it('safeAddDate end', () => {
    const date = safeAddDate(new Date('2019-09-10T00:00:00.000Z'), 10, 'day', new Date('2019-09-12T00:00:00.000Z'));
    expect(date.toISOString()).toEqual('2019-09-12T00:00:00.000Z');
  });

  it('safeAddDate end2', () => {
    const date = safeAddDate(new Date('2019-09-10T00:00:00.000Z'), 10, 'day', new Date('2019-10-12T00:00:00.000Z'));
    expect(date.toISOString()).toEqual('2019-09-20T00:00:00.000Z');
  });

  it('canBeDate', () => {
    // false
    expect(canBeDate(null)).toBeFalsy();
    expect(canBeDate(undefined)).toBeFalsy();
    expect(canBeDate({})).toBeFalsy();
    expect(canBeDate('adf')).toBeFalsy();
    expect(canBeDate('20')).toBeFalsy();
    // true
    expect(canBeDate(1)).toBeTruthy();
    expect(canBeDate(new Date())).toBeTruthy();
    expect(canBeDate(new Date(null))).toBeTruthy();
    expect(canBeDate(new Date().getTime())).toBeTruthy();
    expect(canBeDate(new Date().toISOString())).toBeTruthy();
  });

  it('toDate', () => {
    expect(toDate('2019-09-10T00:00:00.000Z').toISOString()).toEqual('2019-09-10T00:00:00.000Z');
  });
});
