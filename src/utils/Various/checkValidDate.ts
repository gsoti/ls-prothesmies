export function checkValidDate(date: string) {
  let valid = true;
  const year = date.split('-')[0];
  const month = date.split('-')[1];
  const day = date.split('-')[2];

  if (year.length !== 4 || Number.isNaN(parseInt(year))) {
    valid = false;
  }
  if (
    month.length !== 2 ||
    Number.isNaN(parseInt(month)) ||
    parseInt(month) > 12
  ) {
    valid = false;
  }
  if (day.length !== 2 || Number.isNaN(parseInt(day)) || parseInt(day) > 31) {
    valid = false;
  }
  return valid;
}
