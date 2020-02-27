// 添加毫秒
export const addMilliseconds = (date: Date, milliseconds: number) => {
  const newDate = new Date(date);
  newDate.setMilliseconds(newDate.getMilliseconds() + milliseconds);
  return newDate;
};
