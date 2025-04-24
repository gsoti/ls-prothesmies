export function reverseDate(day: string) {
  if (day.split('-')[0].length === 4) {
    return `${day.split('-')[2]}-${day.split('-')[1]}-${day.split('-')[0]}`;
  } else {
    return day;
  }
}
