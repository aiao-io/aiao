// 是不是周末
export const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
