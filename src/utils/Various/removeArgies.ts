import { argiesFunc } from '../ArgiesAndAnastoli/ArgiesFunc';
import { removeArgAndAnastDays } from './addAndRemoveDays';
// console.log(argiesFunc(2022).filter(r => r.includes('2022-02')));

export function removeArgies(arr: string[]) {
  const middleIndex = Math.ceil(arr.length / 2);
  const year = arr[middleIndex].slice(0, 4);

  return removeArgAndAnastDays(arr, argiesFunc(parseInt(year)));
}
// console.log(removeArgies(returnDatesBetween('2022-02-01', '2022-03-25')));
