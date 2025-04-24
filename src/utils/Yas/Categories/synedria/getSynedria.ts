import { getDate } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { Options } from '../../Types/interfaces';

// interface Options {
//   dimosio?: boolean;
// }
export const getSynedria = (start: string, options?: Options): string => {
  let argiesDimosiou: string[] = [];
  const days = options?.exoterikou ? 30 : 20;

  const year = parseInt(start.slice(0, 4));
  let synedria = getDate(start, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [...argiesDimosiou]),
  });

  return synedria.toISOString().split('T')[0];
};
