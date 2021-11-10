function calculateDaysDiff (date: Date): number {
  const oneDay = 1000 * 3600 * 24;
  const today = new Date();
  return Math.round(Math.abs((today.getTime() - date.getTime()) / oneDay));
}

function getDateString(diff: number): string {
  let res = '';
  switch (diff) {
    case 0:
      res = 'Сегодня'
      break
    case 1:
      res = 'Вчера'
      break
    case 2:
      res = 'Позавчера'
      break
    case 3:
    case 4:
      res = `${diff} дня назад`
      break
    default:
      res = `${diff} дней назад`
      break
  }
  return res;
}

export function parseTime(timestamp: string): string {
  const dateObj = new Date(Date.parse(timestamp));
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();
  const timezoneDiff = dateObj.getTimezoneOffset();
  const timezone =
    timezoneDiff.toString()[0] === '+' ?
      'i-GMT–' + Math.abs(timezoneDiff / 60)
      : 'i-GMT+' + Math.abs(timezoneDiff / 60);
  const day = getDateString(calculateDaysDiff(dateObj));
  return String(day + ', ' + hours + ':' + minutes + ' ' + timezone);
}