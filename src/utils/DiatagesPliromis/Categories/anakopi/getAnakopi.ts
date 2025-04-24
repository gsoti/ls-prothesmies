import { getDateErgasimesOnly } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { Options } from '../../Types/interfaces';
import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';

// interface Options {
//   dimosio?: boolean;
// }
export const getAnakopi = (epidosi: string, options?: Options): string => {
  let argiesDimosiou: string[] = [];
  let days = options?.exoterikou ? 30 : 15;
  days = options?.dimosio ? 30 : days;

  if (options?.dimosio) {
    argiesDimosiou = anastoliDimosiouFunc();
  }
  const year = parseInt(epidosi?.slice(0, 4));
  let anakopi = getDateErgasimesOnly(epidosi, days, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: addArgAndAnastDays(anastoliFunc(year), [...argiesDimosiou]),
  });

  return anakopi.toISOString().split('T')[0];
};
