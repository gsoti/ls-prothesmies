import { addMonths } from '../../../CalculateDates/calculateDate';
import { argiesFunc } from '../../../ArgiesAndAnastoli/ArgiesFunc';
import { addArgAndAnastDays } from '../../../Various/addAndRemoveDays';
// import { anastoliFunc } from '../../../ArgiesAndAnastoli/AnastoliFunc';
import { extraArgies } from '../../../ArgiesAndAnastoli/extraArgies';
import { Options } from '../../Types/interfaces';
// import { anastoliDimosiouFunc } from '../../Anastoles/anastoliDimosiou';

// interface Options {
//   dimosio?: boolean;
// }
export const getLixi = (start: string, options?: Options): string => {
  // let argiesDimosiou: string[] = [];
  let months = options?.exoterikou ? 12 : 4;
  const year = parseInt(start.slice(0, 4));
  let lixi = addMonths(start, months, {
    argies: addArgAndAnastDays(argiesFunc(year), [...extraArgies]),
    anastoli: [],
  });

  return lixi.correctDate.toISOString().split('T')[0];
};
