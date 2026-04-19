import { returnDatesBetween } from '../../../Various/returnDatesBetween';

export const getSummerSuspensionDates = (katathesi: string): string[] => {
  const filingYear = parseInt(katathesi.slice(0, 4), 10);
  const dates: string[] = [];

  for (let year = filingYear - 1; year <= filingYear + 2; year++) {
    dates.push(...returnDatesBetween(`${year}-07-01`, `${year}-09-15`));
  }

  return [...new Set(dates)].sort();
};
