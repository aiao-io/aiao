export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
};
