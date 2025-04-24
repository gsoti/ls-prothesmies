import { getDate } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';

// interface Options {
//   dimosio?: boolean;
// }
export const getOloklirosi = (start: string): string => {
  let argiesDimosiou: string[] = [];
  const days = 40;

  const year = parseInt(start.slice(0, 4));
  let oloklirosi = getDate(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [...argiesDimosiou]),
  });

  return oloklirosi.toISOString().split('T')[0];
};
