import { returnDatesBetween } from '../Various/returnDatesBetween';
export function statheresArgiesFunc(year: number) {
  const standardArgies = [
    '01-01', // Πρωτοχρονιά
    '01-06', // Θεοφάνεια
    '03-25', // 25η Μαρτίου
    '05-01', // 1η Μαΐου
    '08-15', // Κοίμηση της Θεοτόκου
    '10-03', // Αγίου Διονυσίου
    '10-28', // 28η Οκτωβρίου
    '12-25', // Χριστούγεννα
    '12-26', // 2η μέρα Χριστουγέννων
  ];
  const arr = [];
  for (let k = 0; k < standardArgies.length; k++) {
    arr.push(`${year}-${standardArgies[k]}`);
  }
  const allDatesOfTheYear = returnDatesBetween(
    `${year}-01-01`,
    `${year}-12-31`
  );

  for (let i = 0; i < allDatesOfTheYear.length; i++) {
    if (
      new Date(allDatesOfTheYear[i]).getDay() === 6 ||
      new Date(allDatesOfTheYear[i]).getDay() === 0
    ) {
      arr.push(allDatesOfTheYear[i]);
    }
  }

  return arr.sort();
}
