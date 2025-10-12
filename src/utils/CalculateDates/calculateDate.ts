import { returnDatesBetween } from '../Various/returnDatesBetween';

const isLeapYear = function(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

const getDaysInMonth = function(year: number, month: number) {
  return [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month];
};

// Date.prototype.isLeapYear = function() {
//   return Date.isLeapYear(this.getFullYear());
// };

// Date.prototype.getDaysInMonth = function() {
//   return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
// };

export const addMonths = function(
  start: string,
  noOfMonths: number,
  argiesAndAnastoli: { argies: string[]; anastoli: string[] }
) {
  const startDate = new Date(start);

  const n = startDate.getDate();
  startDate.setTime(startDate.getTime() + 12 * 60 * 60 * 1000);
  startDate.setDate(1);
  startDate.setMonth(startDate.getMonth() + noOfMonths);
  const minDate = Math.min(
    n,
    getDaysInMonth(startDate.getFullYear(), startDate.getMonth())
  );
  let correctDate = minDate < n ? 1 : minDate;
  minDate < n && startDate.setMonth(startDate.getMonth() + 1);
  let dateWithCorrectDay = new Date(startDate.setDate(correctDate));
  let dateWithoutAnastoli = dateWithCorrectDay;

  let isDateInAnastoliCount = [];
  let datesBetween = returnDatesBetween(
    start,
    dateWithCorrectDay.toISOString().slice(0, 10)
  );

  for (let index = 0; index < datesBetween.length; index++) {
    if (argiesAndAnastoli.anastoli.includes(datesBetween[index])) {
      isDateInAnastoliCount.push(datesBetween[index]);
      do {
        const lastDate: Date = new Date(isDateInAnastoliCount.at(-1) as string);
        isDateInAnastoliCount.push(
          new Date(lastDate.setTime(lastDate.getTime() + 24 * 60 * 60 * 1000))
            .toISOString()
            .slice(0, 10)
        );
      } while (
        argiesAndAnastoli.anastoli.includes(
          isDateInAnastoliCount.at(-1) as string
        )
      );
    }
  }
  isDateInAnastoliCount = [...new Set(isDateInAnastoliCount)];
  isDateInAnastoliCount.pop();

  if (
    datesBetween.at(-1)
      ? datesBetween.at(-1)
      : '0' >= dateWithCorrectDay.toISOString().slice(0, 10)
  ) {
    dateWithCorrectDay = new Date(datesBetween.at(-1)!!);
  }

  dateWithCorrectDay.setTime(
    dateWithCorrectDay.getTime() +
      isDateInAnastoliCount.length * 24 * 60 * 60 * 1000
  );
  let firstArgia = '';

  while (
    [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
      r =>
        new Date(r).toDateString() ===
        new Date(dateWithCorrectDay).toDateString()
    ) !== -1
  ) {
    if (firstArgia === '') {
      firstArgia = dateWithCorrectDay.toISOString().slice(0, 10);
    }
    dateWithCorrectDay.setTime(dateWithCorrectDay.getTime() + 24 * 3600 * 1000);
  }

  return { correctDate: dateWithCorrectDay, dateWithoutAnastoli, firstArgia };
};

// export function addMonths(
//   start: string,
//   noOfMonths: number
//   // argiesAndAnastoli: { argies: string[]; anastoli: string[] }
// ) {
//   const startDate = new Date(start);
//   const dateWithAddedMonths = new Date(
//     startDate.setMonth(startDate.getMonth() + noOfMonths)
//   );
//   return dateWithAddedMonths;
// }

export function getDate(
  start: string,
  noOfDays: number,
  argiesAndAnastoli: { argies: string[]; anastoli: string[] }
): Date {
  return getDateInfo(start, noOfDays, argiesAndAnastoli).date
}

export function getDateInfo(
  start: string,
  noOfDays: number,
  argiesAndAnastoli: { argies: string[]; anastoli: string[] }
): { date: Date, paused: string[], skipped: string[] } {
  let arr = [];
  let dt = new Date(start);

  var paused: string[] = [];
  var skipped: string[] = [];

  for (var i = 0; i < noOfDays; i) {
    dt.setTime(dt.getTime() + 24 * 3600 * 1000);

    if (!argiesAndAnastoli.anastoli.includes(dt.toISOString().split('T')[0])) {
      arr.push(new Date(dt));
      i++;
    } else {
      paused.push(new Date(dt).toISOString().split('T')[0]);
    }
  }
  let lastDay = new Date();

  lastDay = arr.at(-1) as Date;

  while (
    [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
      r => new Date(r).toDateString() === new Date(lastDay).toDateString()
    ) !== -1
  ) {
    skipped.push(new Date(lastDay).toISOString().split('T')[0]);
    lastDay.setTime(lastDay.getTime() + 24 * 3600 * 1000);
    arr.push(new Date(lastDay));
  }
  return {
    date: arr.at(-1) as Date,
    paused: paused,
    skipped: skipped
  }
}
export function getDateErgasimesOnly(
  start: string,
  noOfDays: number,
  argiesAndAnastoli: { argies: string[]; anastoli: string[] }
): { date: Date, paused: string[], skipped: string[] } {
  let arr = [];
  let dt = new Date(start);

  var paused: string[] = [];
  var skipped: string[] = [];

  for (var i = 0; i < noOfDays; i) {
    dt.setTime(dt.getTime() + 24 * 3600 * 1000);

    if (
      [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
        r => r === dt.toISOString().split('T')[0]
      ) === -1
    ) {
      arr.push(new Date(dt));
      i++;
    } else {
      paused.push(new Date(dt).toISOString().split('T')[0]);
    }
  }
  let lastDay = new Date();

  lastDay = arr.at(-1) as Date;

  while (
    [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
      r => new Date(r).toDateString() === new Date(lastDay).toDateString()
    ) !== -1
  ) {
    skipped.push(new Date(lastDay).toISOString().split('T')[0]);
    lastDay.setTime(lastDay.getTime() + 24 * 3600 * 1000);
    arr.push(new Date(lastDay));
  }
  return {
    date: arr.at(-1) as Date,
    paused: paused,
    skipped: skipped
  };
}

export function getDateReverse(
  start: string,
  noOfDays: number,
  argiesAndAnastoli: { argies: string[]; anastoli: string[] }
) {
  return getDateReverseCalculation(start, noOfDays, argiesAndAnastoli).date;
}

export function getDateReverseCalculation(
  start: string,
  noOfDays: number,
  argiesAndAnastoli: { argies: string[]; anastoli: string[] }
): { date: Date, paused: string[], skipped: string[] } {
  let arr = [];
  let dt = new Date(start);

  var paused: string[] = [];
  var skipped: string[] = [];

  for (var i = 0; i < noOfDays; i) {
    dt.setTime(dt.getTime() - 24 * 3600 * 1000);
    if (
      argiesAndAnastoli.anastoli.findIndex(
        r => r === dt.toISOString().split('T')[0]
      ) === -1
    ) {
      arr.push(new Date(dt));
      i++;
    } else {
      paused.push(new Date(dt).toISOString().split('T')[0]);
    }
  }
  let lastDay = new Date();

  lastDay = arr.at(-1) as Date;

  while (
    [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
      r => new Date(r).toDateString() === new Date(lastDay).toDateString()
    ) !== -1
  ) {
    skipped.push(new Date(lastDay).toISOString().split('T')[0]);
    lastDay.setTime(lastDay.getTime() - 24 * 3600 * 1000);
    arr.push(new Date(lastDay));
  }

  return {
    date: arr.at(-1) as Date,
    paused: paused,
    skipped: skipped
  }
}

export function analyseArgies(
  start: string,
  noOfDays: number,
  argiesAndAnastoli: { argies: string[]; anastoli: string[] }
) {
  let firstArgia = [];
  let arr = [];
  let dt = new Date(start);

  for (var i = 0; i < noOfDays; i) {
    dt.setTime(dt.getTime() + 24 * 3600 * 1000);

    if (!argiesAndAnastoli.anastoli.includes(dt.toISOString().split('T')[0])) {
      arr.push(new Date(dt));
      i++;
    }
  }
  let lastDay = new Date();

  lastDay = arr.at(-1) as Date;

  while (
    [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
      r => new Date(r).toDateString() === new Date(lastDay).toDateString()
    ) !== -1
  ) {
    if (
      argiesAndAnastoli.argies.findIndex(
        r => new Date(r).toDateString() === new Date(lastDay).toDateString()
      ) !== -1
    ) {
      firstArgia.push(lastDay.toISOString().split('T')[0]);
    }
    lastDay.setTime(lastDay.getTime() + 24 * 3600 * 1000);
    arr.push(new Date(lastDay));
  }
  return firstArgia[0] ? firstArgia[0] : '';
}

export function analyseArgiesReverse(
  start: string,
  noOfDays: number,
  argiesAndAnastoli: { argies: string[]; anastoli: string[] }
) {
  let firstArgia = [];

  let arr = [];
  let dt = new Date(start);
  for (var i = 0; i < noOfDays; i) {
    dt.setTime(dt.getTime() - 24 * 3600 * 1000);
    if (
      argiesAndAnastoli.anastoli.findIndex(
        r => r === dt.toISOString().split('T')[0]
      ) === -1
    ) {
      arr.push(new Date(dt));
      i++;
    }
  }
  let lastDay = new Date();

  lastDay = arr.at(-1) as Date;

  while (
    [...argiesAndAnastoli.argies, ...argiesAndAnastoli.anastoli].findIndex(
      r => new Date(r).toDateString() === new Date(lastDay).toDateString()
    ) !== -1
  ) {
    if (
      argiesAndAnastoli.argies.findIndex(
        r => new Date(r).toDateString() === new Date(lastDay).toDateString()
      ) !== -1
    ) {
      firstArgia.push(lastDay.toISOString().split('T')[0]);
    }
    lastDay.setTime(lastDay.getTime() - 24 * 3600 * 1000);
    arr.push(new Date(lastDay));
  }

  return firstArgia[0] ? firstArgia[0] : '';
}
