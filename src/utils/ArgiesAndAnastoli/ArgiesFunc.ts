import { kinitesArgiesFunc } from './KinitesFunc';
import { statheresArgiesFunc } from './StatheresFunc';

export function argiesFunc(year?: number) {
  const arr = [];
  if (year) {
    for (let i = year - 1; i <= year + 1; i++) {
      arr.push(kinitesArgiesFunc(i));
      arr.push(statheresArgiesFunc(i));
    }
  } else {
    for (let i = 0; i < 20; i++) {
      arr.push(kinitesArgiesFunc(2015 + i));
      arr.push(statheresArgiesFunc(2015 + i));
    }
  }
  return arr.flat().sort();
}
