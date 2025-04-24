// Takes a number as a parameter and if the number is 1-9 adds a zero in the begining, and returns the string of the number.
// Eg. 3 => '03', 15 => '15'

export function addZeroToNumber(num: number) {
  let result = num.toString();
  if (num.toString().length === 1) {
    result = `0${num}`;
  }
  return result;
}
