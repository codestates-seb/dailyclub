import { getToday } from './getToday';

export const compareWithToday = (date: string) => {
  const compareDate = new Date(date);
  const todayDate = new Date(getToday());
  if (compareDate.getTime() < todayDate.getTime()) {
    return '모임종료';
  }
  if (compareDate.getTime() == todayDate.getTime()) {
    return '오늘마감';
  }
  if (compareDate.getTime() > todayDate.getTime()) {
    return '모임예정';
  }
};
