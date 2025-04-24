import { addZeroToNumber as addZero } from '../Various/addZeroToNumber';

export function anastoliFunc(year?: number) {
  const arr = [];
  if (year) {
    for (let i = year - 1; i <= year + 1; i++) {
      for (let k = 1; k <= 31; k++) {
        arr.push(`${i}-08-${addZero(k)}`);
      }
    }
  } else {
    for (let i = 0; i < 20; i++) {
      for (let k = 1; k <= 31; k++) {
        arr.push(`20${addZero(i + 15)}-08-${addZero(k)}`);
      }
    }
  }
  return arr.flat().sort();
}
