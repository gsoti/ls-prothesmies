import { addMonths, getDate } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { Options } from '../../Types/interfaces';
import { getSummerSuspensionDates } from './getSummerSuspensionDates';

const N5221_EFFECTIVE_DATE = '2026-01-01';

export type DikasimosWindow = {
  dikasimosCalculated?: string;
  dikasimosEarliest?: string;
  dikasimosLatest?: string;
};

const toIsoDate = (date: Date) => date.toISOString().split('T')[0];

export const getDikasimosWindow = (
  katathesi: string,
  options: Options
): DikasimosWindow => {
  if (new Date(katathesi).getTime() < new Date(N5221_EFFECTIVE_DATE).getTime()) {
    return {};
  }

  const year = parseInt(katathesi.slice(0, 4), 10);
  const argiesAndAnastoli = {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: getSummerSuspensionDates(katathesi),
  };

  if (options.exoterikou) {
    const earliest = addMonths(katathesi, 9, argiesAndAnastoli).correctDate;
    const latest = addMonths(katathesi, 10, argiesAndAnastoli).correctDate;
    const dikasimosEarliest = toIsoDate(earliest);
    const dikasimosLatest = toIsoDate(latest);

    return {
      dikasimosCalculated: options.dikasimos ?? dikasimosEarliest,
      dikasimosEarliest,
      dikasimosLatest,
    };
  }

  const earliest = getDate(katathesi, 200, argiesAndAnastoli);
  const latest = getDate(katathesi, 210, argiesAndAnastoli);
  const dikasimosEarliest = toIsoDate(earliest);
  const dikasimosLatest = toIsoDate(latest);

  return {
    dikasimosCalculated: options.dikasimos ?? dikasimosEarliest,
    dikasimosEarliest,
    dikasimosLatest,
  };
};
