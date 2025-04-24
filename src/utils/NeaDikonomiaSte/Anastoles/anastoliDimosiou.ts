import { addZeroToNumber as addZero } from '../../Various/addZeroToNumber';
import { removeArgAndAnastDays } from '../../Various/addAndRemoveDays';
import { returnDatesBetween } from '../../Various/returnDatesBetween';

export function anastoliDimosiouFunc(year?: number) {
  const arr = [];
  if (year) {
    for (let i = year - 4; i <= year + 5; i++) {
      for (let k = 1; k <= 31; k++) {
        arr.push(`${i}-07-${addZero(k)}`);
      }
      for (let j = 1; j <= 15; j++) {
        arr.push(`${i}-09-${addZero(j)}`);
      }
    }
  } else {
    for (let i = 0; i < 20; i++) {
      for (let k = 1; k <= 31; k++) {
        arr.push(`20${addZero(i + 15)}-07-${addZero(k)}`);
      }
      for (let j = 1; j <= 15; j++) {
        arr.push(`20${addZero(i + 15)}-09-${addZero(j)}`);
      }
    }
  }
  return removeArgAndAnastDays(arr.flat().sort(), [
    ...returnDatesBetween('2020-07-01', '2020-07-15'),
    ...returnDatesBetween('2020-09-01', '2020-09-15'),
    ...returnDatesBetween('2021-09-01', '2021-09-15'),
  ]);
}
